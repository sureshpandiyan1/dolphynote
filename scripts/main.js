

function dolphyNote(appname) {
  this.appname = appname
}


function emojiinterface() {
  var emoji = [128512, 128513, 128514, 128515, 128516, 128517, 128518, 128519, 128520, 128521, 128522, 128523,
    128524, 128525, 128526, 128527, 128528, 128529, 128530, 128531, 128532, 128533, 128534, 128535, 128536,
    128537, 128538, 128539, 128540, 128541, 128542, 128543, 128544, 128545, 128546, 128547, 128548, 128549, 128550,
    128551, 128552, 128553, 128554, 128555, 128556, 128557, 128558, 128559, 128560, 128561, 128562, 128563, 128564,
    128565, 128566, 128567, 128577, 128578, 128579, 128580, 129296, 129297, 129298, 129299, 129300, 129301, 129312,
    129313, 129314, 129315, 129316, 129317, 129319, 129320, 129321, 129322, 129323, 129324, 129325, 129326, 129327,
    129488]

    var EMOJICNT = document.createElement('ul')
    EMOJICNT.setAttribute('id','emojlist')

    for (let theemoj of emoji) {
      var listemoj = document.createElement('li')
      listemoj.setAttribute('id','emoji_'+theemoj)
      listemoj.setAttribute('onmousedown', 'event.preventDefault()')
      listemoj.innerHTML = '&#'+theemoj+';'
      EMOJICNT.appendChild(listemoj)
    }



    return EMOJICNT

}



dolphyNote.prototype.tapInterface = function() {
  
  
  var taponce = 0;
  const TAPIT = document.getElementById('tap_tcn')
  TAPIT.onclick = function() {
    taponce++

    if (taponce == 1) {
    
    const ATTACHTHAT = document.getElementById('the_box')
    var closebox = document.createElement('div')
    var createBox = document.createElement('div')
    const FVPROPS = document.createElement('div')
    const TXTBOX = document.createElement('div')
    const EMOJBOX = document.createElement('div')
    EMOJBOX.setAttribute('id','emojbx')
    EMOJBOX.setAttribute('onmousedown', 'event.preventDefault()')
    EMOJBOX.textContent = ':)'
    var thetextcrt = document.createTextNode('✖')
    const IBOX = document.createElement('input')
    
    var boxProps = ['B','I','A+','A-']
    for (let x of boxProps) {
      closebox.setAttribute('id','closethebox')
      FVPROPS.setAttribute('id','tprops')
      TXTBOX.setAttribute('contentEditable', true)
      TXTBOX.setAttribute('id','nc_1')
      const INSIDEBOX = document.createElement('div')
      IBOX.setAttribute('type','color')
      IBOX.setAttribute('id','clrs')
      const BOX = x == 'B' ? 'bold' :
                  x == 'I' ?  'italic' :
                  x == 'A+' ? 'inc' :
                  x == 'A-' ? 'dcr' : 'color'
      INSIDEBOX.setAttribute('id', BOX)
      INSIDEBOX.setAttribute('onmousedown', 'event.preventDefault()')
      
      var btext = document.createTextNode(x)
      closebox.appendChild(thetextcrt)
      

      FVPROPS.appendChild(INSIDEBOX)
      INSIDEBOX.appendChild(btext)
      ATTACHTHAT.appendChild(TXTBOX)
      ATTACHTHAT.appendChild(FVPROPS)
      FVPROPS.appendChild(IBOX)
      FVPROPS.appendChild(EMOJBOX)
      ATTACHTHAT.appendChild(closebox)
      document.getElementById('tap_tcn').style.display = 'none';

      //

    }
  } else {
    
    TAPIT.onclick = null;
  }


  
  
  document.getElementById('emojbx').appendChild(emojiinterface())
  document.getElementById('emojbx').children[0].style.display = 'none'

  

  const dolphyInterface = new dolphyNote('dolphynote')
  window.addEventListener('click', dolphyInterface.PropertyInterface, false)
  
  document.getElementById('closethebox').onclick = function () {


    const RETERIVE_TXT = document.getElementById('nc_1')
    if (RETERIVE_TXT.innerHTML != '') {
      var dolphystorage = {
        "text": RETERIVE_TXT.innerHTML,
        "date": new Date().toDateString(),
        "color": document.getElementById('nc_1').style.background != '' ? document.getElementById('nc_1').style.background : "rgb(173, 171, 171)"
      }

      try {
        localStorage.setItem('dolphyid_'+new Date().getTime(), JSON.stringify(dolphystorage))
      } catch(e) {
        if (e == QUOTA_EXCEEDED_ERR) {
        alert("out of storage")
      }
      }
      document.getElementById('sidebar').removeChild(document.getElementById('the_box'))
      window.location.reload()
    } else if (RETERIVE_TXT.innerHTML == ''){
      localStorage.removeItem('dolphyid_'+new Date().getTime())
      
      document.getElementById('sidebar').removeChild(document.getElementById('the_box'))
    }
  }

}



}

function getTarget(e) {
  if (!e) {
    e = window.event
  }
  return e.target || e.srcElement
}

function gettar(e) {
  

    window.getSelection().getRangeAt(0).insertNode(document.createTextNode(getTarget(e).textContent))
    
  
}

function emojtar() {

  const EMOJ = document.getElementById('emojlist').children;
  for (i =0; i < EMOJ.length - 1; i++) {
    if (EMOJ[i].id != 'theclose') {
      EMOJ[i].onclick = gettar
    }
  }
}




var incSize = 0;
dolphyNote.prototype.PropertyInterface = function(e) {
  try {
  const CONTROLPROPS = document.getElementById('tprops').children
  const GETPROP = getTarget(e)

  for (let theprops in CONTROLPROPS) {
    const allprops = CONTROLPROPS[theprops].id == 'bold' && GETPROP.id == 'bold' ? 'bold' :
                     CONTROLPROPS[theprops].id == 'italic' && GETPROP.id == 'italic' ? 'italic' : 'color';

    if (CONTROLPROPS[theprops].textContent == 'A+' && GETPROP.id == 'inc') {
      incSize++
      document.execCommand('fontsize', null, 2 + incSize)
    } else if (CONTROLPROPS[theprops].textContent == 'A-' && GETPROP.id == 'dcr'){
      incSize--
      document.execCommand('fontsize', null, incSize)
    }  else if (CONTROLPROPS[theprops].textContent == '' && GETPROP.id == 'clrs'){
        document.getElementById('clrs').addEventListener('input', function() {
          document.getElementById('nc_1').style.background = GETPROP.value
        }, false)
    } else if (GETPROP.id == 'emojbx') {
      document.getElementById('emojbx').children[0].style.display = 'block'
      emojtar()
      document.getElementById('nsearch').setAttribute('onmousedown', 'event.preventDefault()')

      document.getElementById('emojlist').addEventListener('mouseover', function() {
      
        document.getElementById('emojlist').style.display = 'block'
      
    }, false)

    document.getElementById('emojlist').addEventListener('mouseout', function() {
    
      document.getElementById('emojlist').style.display = 'none'
    
  }, false)
      
    } else {
      document.execCommand(allprops, null, false)
    }
  
}
} catch(e) {
  console.log(e.error)
  window.location.reload()
}
}



function dolphyNote() {
  const DOLPHYTAP = new dolphyNote('sdolphy')
  DOLPHYTAP.tapInterface()
}

function loadNote(appname) {
  dolphyNote.call(this, appname)
}

loadNote.prototype = new dolphyNote()
loadNote.prototype.constructor = loadNote

function dels(e) {
  var DELPARTICULAR = getTarget(e)
  if (DELPARTICULAR.id.startsWith('trsh_')) {
    localStorage.removeItem(DELPARTICULAR.parentNode.id)
    window.location.reload()
  }
}


loadNote.prototype.toHTML = function() {
  const GEDOLPHYNOTES = localStorage
  const STOREIT = [];
  for (i=0; i < GEDOLPHYNOTES.length; i++) {
    var dolphyIds = GEDOLPHYNOTES.key(i)
    if (dolphyIds.startsWith('dolphyid_')) {
      var shownote = document.createElement('div')
      var delnote = document.createElement('div')
      var expandnote = document.createElement('div')
      expandnote.setAttribute('id','expandnote_'+dolphyIds)
      expandnote.style.cssText = 'position: absolute; top: 0px; width: 28px; right: 0px; text-align: center; color: #141414; background: white; opacity: 0.5;'
      expandnote.textContent = '⤢'
      delnote.setAttribute('id','trsh_'+dolphyIds.split('_')[1])
      delnote.style.cssText = 'position: absolute; bottom: 10px;  right: 5px;   width: 27px; background-size: 26px 23px; height: 23px; border-radius: 0; border: none; appearance: none; background-image: url(/modernsmartnotes/images/trsh-2.png); cursor: pointer; background-color: transparent !important;'
      delnote.setAttribute('onclick', 'dels(event)')
      shownote.setAttribute('id', dolphyIds)
      
      var theparse = JSON.parse(GEDOLPHYNOTES[dolphyIds])
      shownote.style.cssText = 'background:' + theparse.color + ';'
      shownote.innerHTML = theparse.text
      shownote.appendChild(expandnote)
      shownote.appendChild(delnote)
      STOREIT.push(shownote)
  } else if (JSON.parse(GEDOLPHYNOTES[GEDOLPHYNOTES.key(i)]).text == ''){
     localStorage.removeItem(GEDOLPHYNOTES[GEDOLPHYNOTES.key(i)])
  }
}
return STOREIT;
}

function loaddolphyNote() {
  var dolphyshownotes = new loadNote('ldsdolphy').toHTML()
  const THENOTES = document.getElementById('lnotes')
  THENOTES.style.height = window.screen.height / 2 + 'px'
  for (noteitem = 0; noteitem < dolphyshownotes.length; noteitem++) {
      THENOTES.appendChild(dolphyshownotes[noteitem])
  }
}

function SaveNote(body, color, date) {
  this.bdy = body;
  this.clr = color;
  this.dt = date;
}


SaveNote.prototype.dolphyShow = function() {
  const thenotes = [];
  const SAVENOTES = localStorage
  for (i = 0; i < SAVENOTES.length; i++) {
    thenotes.push(JSON.parse(SAVENOTES[SAVENOTES.key(i)]))
  }
  return thenotes;
}



function dolphysearcher() {
  var searcher = document.getElementById('nsearch')
  var searchitem = document.getElementById('lnotes')
  var rptn = '[A-Z]{1}[a-z]{2,3}.[A-Z]{1}[a-z]{2}.[0-9]{1,2}.[0-9]{4}'
  for (i =0; i < searchitem.children.length; i++) {

    if (searchitem.children[i].textContent.indexOf(searcher.value) > -1) {
      searchitem.children[i].style.display = 'block'

    } else if (new Date(parseInt(searchitem.children[i].id.split('_')[1])).toString().match(rptn)[0].toLowerCase().includes(searcher.value)) {
      searchitem.children[i].style.display = 'block'
    } else if (searchitem.children[i].style.background.includes(searcher.value)) {
      searchitem.children[i].style.display = 'block'
    }
    else {
      searchitem.children[i].style.display = 'none'
    }
  }
}

function thecolorchips() {
  var storecolor = []
  const BOXBAR = document.getElementById('sidebar')
  const DOLPHYCOLOR = localStorage
  for (i =0; i < DOLPHYCOLOR.length; i++) {
    var thekey = DOLPHYCOLOR.key(i)
    if (thekey.startsWith("dolphyid")) {
      var that = JSON.parse(DOLPHYCOLOR[thekey])
      storecolor.push(that.color)
    }
  }
  var colors = storecolor.filter((item,index) => storecolor.indexOf(item) === index);

const thecolor = document.createElement('div')
thecolor.setAttribute('id','colorchips')
const thes = document.createElement('div')
var that = []
  for (i =0; i < colors.length; i++) {
    thes.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px;overflow-y: scroll;'
    const thechips = document.createElement('div')
    thechips.style.background = colors[i]
    thecolor.appendChild(thes)
    thes.appendChild(thechips)
    that.push(thecolor)
  }
  return that[0]

}


function unwantednotes() {
  const UNWANTEDNOTES = localStorage
  for (i =0; i < UNWANTEDNOTES.length; i++) {
    var thekey = UNWANTEDNOTES.key(i)
    var thats = JSON.parse(UNWANTEDNOTES[thekey])
    if (thats.text == '') {
      localStorage.removeItem(thekey)
    } else {
      return false;
    }
  }
}


function selectedchips(vals) {
    for (i = 0; i < localStorage.length; i++) {
      var y = JSON.parse(localStorage[localStorage.key(i)])
          if (y.color == vals) {
            document.getElementById(localStorage.key(i)).style.display = 'block'
          } else {
            document.getElementById(localStorage.key(i)).style.display = 'none'
          }
    }
}

function expandwidth(e) {
  var targ = getTarget(e)
  
  const THENOTE = document.getElementById('lnotes')
  for (i =0; i < THENOTE.children.length; i++) {
    if (targ.id ==  'expandnote_'+THENOTE.children[i].id) {
      document.getElementById('expandnote_'+THENOTE.children[i].id).style.display = 'none'

      document.getElementById(THENOTE.children[i].id).style.width = '190px'
      
      var divs = document.createElement('div')
      divs.style.cssText = 'position: absolute; top: 6px; right: 11px; opacity: 0.56; cursor: pointer'
      divs.textContent = '✖'
      divs.setAttribute('id','expandclose')
      divs.style.cssText = 'display: none; background: transparent;'
      
      document.getElementById(THENOTE.children[i].id).appendChild(divs)

      document.getElementById('expandclose').addEventListener('click',  function() {
        document.getElementById(targ.id).style.width = '100px'
        document.getElementById('expandnote_'+THENOTE.children[i].id).style.display = 'none'
        
        window.location.reload()
      }, false)

    } else {
      document.getElementById('expandnote_'+THENOTE.children[i].id).style.width = '28px'
      document.getElementById(THENOTE.children[i].id).style.width = '100px'
       
        
      
      document.getElementById('expandnote_'+THENOTE.children[i].id).style.display = 'block'
      
      
    }
}
}

function loadchips() {
    try {
      if (document.getElementById('lnotes').children.length > 0) {
        document.getElementById('sidebar').appendChild(thecolorchips())
      }
    } catch(e) {
      console.log(e.error)
    }
  }


function thesideprops() {
  var tday = [], yday = [], all = [];
  var tdtime = new Date().toDateString()
  var ydtime =  tdtime.split(' ')[0] + ' ' +
                  tdtime.split(' ')[1] +' ' +
                  String(parseInt(tdtime.split(' ')[2]) - 1) + ' ' +
                  tdtime.split(' ')[3]
  const THETYM = localStorage
  for (i =0; i < THETYM.length; i++) {
    var thekey = THETYM.key(i)
    if (thekey.startsWith('dolphyid_')){
      var thatv = JSON.parse(THETYM[thekey])
      all.push(thatv.date)
      if (thatv.date == tdtime) {
        tday.push(thatv.date)
      } else if (thatv.date == ydtime) {
        yday.push(thatv.date)
      }
    } else {return false;}
  }
  var thenote =  {
    today: (tday != []) ? 'today '+tday.length: 0,
    yesterday: (yday != []) ? 'yesterday '+ yday.length: 0,
    all: (all != []) ? 'all notes '+ all.length: 0
}

var tm = document.createElement('div')
tm.setAttribute('id','allnotes')
var dtt = document.createElement('ul')
dtt.setAttribute('id','thenotes')
for (let x of [thenote.today,thenote.yesterday,thenote.all]) {
  var dt = document.createElement('li')
  var y = document.createTextNode(x)
  dt.appendChild(y)
  dtt.appendChild(dt)
  tm.appendChild(dtt)
  document.getElementById('sidebar').appendChild(tm)

}

}

function ldalrt() {
  
  const LIMITSTORAGE = 4000;
  const ALERTCHECKER = document.getElementById('thentsts');
  const USED = localStorage.length;
  var thetotal = USED / LIMITSTORAGE * LIMITSTORAGE / 40;
  ALERTCHECKER.value = Math.ceil(thetotal)
  var thehint = localStorage.length + ' / ' + String(LIMITSTORAGE)
  var per = document.createElement('span')
  per.textContent = Math.ceil(thetotal) + '%'
  ALERTCHECKER.parentNode.appendChild(per)

  if (ALERTCHECKER.value < 50) {
    document.getElementById('helpst').textContent = 'good storage level'
    document.getElementById('helpst').style.color = 'green'
  } else if (ALERTCHECKER.value > 50 && ALERTCHECKER.value < 80) {
    
    document.getElementById('helpst').innerHTML =  'medium storage level'
    document.getElementById('helpst').style.color = 'orange'
  } else if (ALERTCHECKER.value > 80 && ALERTCHECKER.value < 101) {
    
    document.getElementById('helpst').innerHTML =  'you are already reached maximum level of storage'
    document.getElementById('helpst').style.color = 'red'
  } if (ALERTCHECKER.value > -1 && ALERTCHECKER.value < 1) {
    document.getElementById('helpst').textContent = 'try to write a notes'
    document.getElementById('helpst').style.color = 'purple'
  }

}

setTimeout(ldalrt(),100000)



thecolorchips()
thesideprops()
document.getElementById('nsearch').addEventListener('keyup', dolphysearcher, false)
dolphyNote()
loaddolphyNote()
loadchips()
window.addEventListener('click', expandwidth, false)
unwantednotes()








