package CGI;
# A stand-in for CGI.pm: the parameters come from QUERY_STRING, and there are no cookies.
sub new { my %p; for (split /&/, ($ENV{QUERY_STRING} // '')) { my ($k, $v) = split /=/, $_, 2; $v //= ''; $v =~ tr/+/ /; $v =~ s/%([0-9A-Fa-f]{2})/chr hex $1/ge; $p{$k} = $v } bless {p => \%p}, shift }
sub param { my ($s, $k) = @_; return keys %{$s->{p}} unless defined $k; $s->{p}{$k} }
sub cookie { '' }
sub header { '' }
1;
