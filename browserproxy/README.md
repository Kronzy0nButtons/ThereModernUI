# Rebuilt There Edge proxy DLLs

`browserproxy/BrowserProxy.modui.dll` and `flashproxy/FlashProxy.modui.dll`
are build outputs. Don't edit or commit them by hand. They come from
`build-proxies.ps1`, which takes hmphus's latest There Edge
(https://github.com/hmphus/there-edge), applies `patches/there-edge/*.patch`,
and rebuilds both DLLs. See the main README for details.

To change our modifications: edit the patched checkout in `build/there-edge`,
then regenerate the patch from inside that folder, e.g.
`git diff -- BrowserProxy > ../../patches/there-edge/0001-browserproxy-coupling-injection.patch`.
