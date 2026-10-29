#!/usr/bin/perl
# For each day from FROM to TO (MM-DD-YYYY), the office that Compline follows under Divino Afflatu, as Divinum
# Officium decides it: tab-separated date, DO file, Latin title, English title, English rank, DO's rank number,
# duplex (1 simplex or feria, 2 semiduplex, 3 duplex), vespera (1 if the office's First Vespers, 3 if its Second)
# and the commemorations.  build.js runs it; it can also be run alone:
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
use DivinumOfficium::Date qw(prevnext);
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
  precedence($date);
  setsecondcol();
  my %english = %{setupstring('English', $winner) || {}};
  my $englishTitle = $english{Officium} || ($english{Rank} =~ s/;;.*//sr);
  my ($ant, $psalms) = split(';;', psalmi_minor('Latin')->[0]);
  print join("\t", map { $clean->($_) }
    $date, $winner, $winner{Officium}, $englishTitle, rankname('English'),
    $rank, $duplex, $vespera, $psalms, join('|', $commemoratio, $commemoratio1)), "\n";
  last if $date eq $to;
  $date = prevnext($date, 1);
}
