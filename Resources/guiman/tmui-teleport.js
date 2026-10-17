// ThereModernUI - tmui-teleport.js
// The teleport screen. Same hints and ready handshake as the stock
// teleport.js, but it fills the game window on Windows too instead of a
// fixed 800x600 box (the game paints black round the rest).
// Author: DANKIES. Based on There Edge by hmphus (MIT)

let tmuiTeleportSize = '';

function tmuiTeleportFit() {
  // the game window's size: from the game if it tells this page, else what
  // the dock saw last. until then the stock 800x600, whose edges fade to the
  // game's black so the box doesn't show
  let width = Number(There.variables.there_windowwidth ?? 0);
  let height = Number(There.variables.there_windowheight ?? 0);
  if (!(width > 0 && height > 0)) {
    width = Number(There.variables.viewportclientareawidth ?? 0);
    height = Number(There.variables.viewportclientareaheight ?? 0);
  }
  if (!(width > 0 && height > 0)) {
    try {
      const saved = JSON.parse(localStorage.getItem('tmui-window') || 'null');
      width = Number(saved && saved.w || 0);
      height = Number(saved && saved.h || 0);
    } catch (error) {
    }
  }
  if (!(width > 200 && height > 200)) {
    height = 600;
  }
  // the game centres the screen as if it were the stock 800 wide (its left
  // edge stays put when it grows), so keep 800 and only take the full height.
  // the faded sides blend into the game's black
  width = 800;
  const size = `${width}x${height}`;
  if (size == tmuiTeleportSize) {
    return;
  }
  tmuiTeleportSize = size;
  There.fsCommand('setStageWidthHeight', {
    width: width,
    height: height,
  });
  There.fsCommand('setWidthHeight', {
    width: width,
    height: height,
  });
}

There.init({
  onReady: function() {
    tmuiTeleportFit();
    There.fsCommand('setTextureBitDepth', {
      depth: 32,
    });
  },

  onVariable: function(name, value) {
    if (name == 'there_ready' && value == 1) {
      if (There.variables.there_pilotdoid == 0) {
        $('.hint').text('Welcome to There!');
      } else {
        There.fetch({
          path: '/VersionedXmlSvc/veilHints',
          query: {
            Oid: There.variables.there_pilotdoid,
          },
          dataType: 'xml',
          success: function(xml) {
            const xmlAnswer = xml.getElementsByTagName('Answer')[0];
            const xmlAvatarHints = xmlAnswer.getElementsByTagName('AvatarHints')[0];
            const xmlHint = xmlAvatarHints.getElementsByTagName('Hint')[0];
            $('.hint').text(xmlHint.childNodes[0].nodeValue);
          },
        });
      }
      tmuiTeleportFit();
      $('.teleport').attr('data-ready', '1');
    }
    if (name == 'there_windowwidth' || name == 'there_windowheight' ||
        name == 'viewportclientareawidth' || name == 'viewportclientareaheight') {
      tmuiTeleportFit();
    }
  },
});
