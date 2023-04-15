# Ethstats Go Library

This Go code file is part of the Ethstats Go library. The library is free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. The library is distributed in the hope that it will be useful, but without any warranty. For more details, please refer to the GNU Lesser General Public License.

## Functionality

This code file contains a single function `TestParseEthstatsURL` that tests the `parseEthstatsURL` function. The `parseEthstatsURL` function takes a URL string as input and returns three parts: node, pass, and host. The `TestParseEthstatsURL` function tests the `parseEthstatsURL` function with different URL strings and verifies that the returned node, pass, and host values match the expected values.

## Function Description

### TestParseEthstatsURL

This function tests the `parseEthstatsURL` function. It takes different URL strings as input and verifies that the returned node, pass, and host values match the expected values. The function uses the `strconv.Unquote` function to unquote the node value because the value provided will be used as a CLI flag value, so unescaped quotes will be removed.

### parseEthstatsURL

This function takes a URL string as input and returns three parts: node, pass, and host. The function first splits the URL string into three parts: node and pass, and host. It then removes the quotes from the node value using the `strconv.Unquote` function. Finally, it