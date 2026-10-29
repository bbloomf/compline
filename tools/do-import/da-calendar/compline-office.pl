#!/usr/bin/perl
# For each day from FROM to TO (MM-DD-YYYY), the office that Compline follows under Divino Afflatu, as Divinum
# Officium decides it: tab-separated date, DO file, Latin title, English title, English rank, DO's rank number,
# duplex (1 simplex or feria, 2 semiduplex, 3 duplex), vespera (1 if the office's First Vespers, 3 if its Second),
# the psalms, the commemorations, the preces after the Nunc dimittis (0 none, 1 Dominicales, 2 Dominicales said
# kneeling, where the Feriales are said at the other hours), the hymn's tone (the end of the name of DO's GABC file
# of Te lucis, from Latin-gabc's [Hymnus Completorium]) and its doxology (DO's name in Doxologies.txt, or
# Special:<file> for the office's own).  build.js runs it; it can also be run alone:
#   perl compline-office.pl DO_CHECKOUT FROM TO
use utf8;
use strict;
no strict 'vars';
use POSIX;
use Time::Local;

use FindBin qw($Bin);
my ($doDir, $from, $to);
BEGIN {
  ($doDir, $from, $to) = @ARGV;
  die "Usage: perl compline-office.pl DO_CHECKOUT MM-DD-YYYY MM-DD-YYYY\n" unless $to;
  # DO's scripts find each other, and their data, from FindBin's $Bin
  $FindBin::Bin = "$doDir/web/cgi-bin/horas";
  my $here = __FILE__ =~ s{[^/]*$}{}r || './';
  unshift @INC, "$here/cgi-stub", "$Bin/..";
}
use CGI;
use DivinumOfficium::Main qw(liturgical_color);
use DivinumOfficium::Date qw(prevnext getweek);
use DivinumOfficium::RunTimeOptions qw(check_version check_horas check_language);
use DivinumOfficium::Lexicon qw(apply_interlinear);
use DivinumOfficium::LanguageTextTools
  qw(prayer rubric translate load_languages_data omit_regexp suppress_alleluia process_inline_alleluias alleluia_ant ensure_single_alleluia ensure_double_alleluia);

binmode(STDOUT, ':encoding(utf-8)');
binmode(STDERR, ':encoding(utf-8)');

our ($Ck, $missa, $officium) = (0, 0, 'officium.pl');
require "$Bin/../DivinumOfficium/SetupString.pl";
require "$Bin/horascommon.pl";
require "$Bin/../DivinumOfficium/dialogcommon.pl";
require "$Bin/webdia.pl";
require "$Bin/../DivinumOfficium/setup.pl";
require "$Bin/horas.pl";
require "$Bin/horasscripts.pl";
require "$Bin/specials.pl";
require "$Bin/specmatins.pl";
require "$Bin/monastic.pl";
require "$Bin/altovadum.pl";

$q = new CGI;
getini('horas');
loadsetup('');
set_runtime_options('general');
set_runtime_options('parameters');

our $version = check_version('Divino Afflatu - 1954') or die "DO has no version 'Divino Afflatu - 1954'\n";
our ($lang1, $lang2, $langfb) = ('Latin', 'English', 'English');
our $dioecesis = 'Generale';
our $votive = '';
our $hora = 'Completorium';

my $clean = sub { my $s = shift // ''; $s =~ s/[\t\r\n]+/ /g; $s =~ s/^\s+|\s+$//g; $s };

my $date = $from;
while (1) {
  # DO resolves a file's conditions (the hymn's "tonus" and "tempore") when it first reads it, and keeps it for
  # the run: each day reads them afresh, as each of DO's pages does.
  %setupstring_caches_by_version = ();
  precedence($date);
  setsecondcol();
  our $precesferiales = 0;
  my $preces = preces('Dominicales') ? ($precesferiales ? 2 : 1) : 0;
  setChantTone();
  # DO's seasons for the tone and the doxology (get_tempus_id, gettempora) test the office's week ($dayname[0]) with
  # the evening's weekday.  On the Saturday before the 5th Sunday after Easter, whose week is already the Sunday's,
  # that gives the Ascension's; in the week of Quinquagesima, from Wednesday (and on the Saturday before),
  # Passiontide's tone.  They're taken as on that week's Sunday: Paschal time's, and Septuagesima's, as the Liber
  # Usualis has them (DIVINO_AFFLATU_PLAN.md, Phase 4).
  my ($d, $m, $y) = (split('-', $date))[1, 0, 2];
  my $week = getweek($d + 0, $m + 0, $y, 0, 0);
  my ($tone, $doxology);
  {
    local $dayofweek = 0 if ($dayname[0] =~ /^Pasc5/ && $week =~ /^Pasc4/) || $dayname[0] =~ /^Quadp3/;
    %setupstring_caches_by_version = ();
    $tone = setupstring('Latin-gabc', 'Psalterium/Special/Minor Special.txt')->{'Hymnus Completorium'};
    %setupstring_caches_by_version = ();
    (undef, $doxology) = doxology('Latin');
  }
  $tone =~ s/^.*hy(?:--|—)te_lucis_ante_terminum_(.*?)\}.*$/$1/s;
  $doxology .= ":$winner" if $doxology eq 'Special';
  my %english = %{setupstring('English', $winner) || {}};
  my $englishTitle = $english{Officium} || ($english{Rank} =~ s/;;.*//sr);
  my ($ant, $psalms) = split(';;', psalmi_minor('Latin')->[0]);
  print join("\t", map { $clean->($_) }
    $date, $winner, $winner{Officium}, $englishTitle, rankname('English'),
    $rank, $duplex, $vespera, $psalms, join('|', $commemoratio, $commemoratio1), $preces, $tone, $doxology), "\n";
  last if $date eq $to;
  $date = prevnext($date, 1);
}
