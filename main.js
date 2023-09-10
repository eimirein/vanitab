//
//	This code is licensed under VPCDP-1.0 - [https://github.com/eimirein/VPCDP]
//			by Eimi Rein (霊音・永旻) - @eimirein - [https://github.com/eimirein]
//
"use strict"
const temp = []
const assets = []

function emi(id) { if (document.getElementById(id)) { return document.getElementById(id) } }
function qem(id, tag) { if (document.getElementById(id)) { return emi(id).querySelectorAll(tag) } }
// Loop through a class using --> for (let v of classes('classname')) { ... }
function classes(_class) { if (document.getElementsByClassName(_class)) { return document.getElementsByClassName(_class) } }
function percent(this_num, of_the) { return Math.round( (100 * this_num) / of_the ) }
function fullscreen() {
	let em = document.documentElement
	if ( !em.fs || em.fs === 'false' ) {
		if (em.requestFullscreen) { em.requestFullscreen() }
		else if (em.webkitRequestFullscreen) { em.webkitRequestFullscreen() }
		else if (em.msRequestFullscreen) { em.msRequestFullscreen() }
		em.fs = 'true'
		//Userset
		notify(assets[lang].va2notif[1])
	}
	else if ( em.fs === 'true' ) {
		if (document.exitFullscreen) { document.exitFullscreen() }
		else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
		else if (document.msExitFullscreen) { document.msExitFullscreen() }
		em.fs = 'false'
		//Userset
		notify(assets[lang].va2notif[2])
	}
}
// Reload page
function R() { location.reload() }
// Execute js from string after a cooldown
async function wait(ms, str) {
	await new Promise(resolve => setTimeout(resolve, ms))
	eval(str)
}
// Print any data in the console and the element with id ["console"]
function print(...data) {
	let em = emi('console')
	data.forEach(function(message) {
		if (em) {
			em.innerHTML = em.innerHTML + '['+time()+'] '+message.toString()
			em.appendChild(document.createElement('br'))
		}
		console.log('['+time()+'] '+message.toString())
	})
}
// Push a log entry in the console and the element with id ["log"]
function log(data, lvl) {
	let em = emi('log')
	let levels = ['userdata', 'info', 'warning', 'error', 'crash']
	if (em) {
		em.innerHTML = em.innerHTML + '['+time()+'] <@'+levels[lvl || 0]+'> '+data
		em.appendChild(document.createElement('br'))
	}
	console.log('['+time()+'] <@'+levels[lvl || 0]+'> '+data)
}
// Return current local session time/date/timeElapsed as a string value
function time() {
	let get_time = new Date()
	let hour = get_time.getHours()
	let min = get_time.getMinutes()
	let sec = get_time.getSeconds()
	if (hour.toString().length==1) {hour = '0'+hour}
	if (min.toString().length==1) {min = '0'+min}
	if (sec.toString().length==1) {sec = '0'+sec}
	return hour+':'+min+':'+sec
}
function date() {
	let get_date = new Date()
	let dd = get_date.getDate()
	let mm = get_date.getMonth()+1
	let yyyy = get_date.getFullYear()
	if (dd.toString().length==1) {dd = '0'+dd}
	if (mm.toString().length==1) {mm = '0'+mm}
	return yyyy+'.'+mm+'.'+dd
}
let sessionStart = new Date()
function timeElapsed() {
	let current = new Date()
	let dif = (current - sessionStart)/1000
	let sec = Math.floor(dif%60)
	let min = Math.floor((dif/60)%60)
	let hour = Math.floor((dif/60)/60)%24
	return hour+'h '+min+'m '+sec+'s'
}
// Open an url link, pass any value as a second argument to open the link in new tab
function href(https, _blank) {
	if (_blank) { window.open(https, '_blank') }
	else { window.open(https, '_self') }
}
// Local storage. Set [val] to 0 to delete an item, 1 to parse JSON object, none to clean up
function ls(id, val) {
	if (val && (val !== 0) && (val !== 1)) {
		if (typeof val === 'object') {
			window.localStorage.setItem(id, JSON.stringify(val))
		} else { window.localStorage.setItem(id, val) }
	}
	else if (val == 0) {
		window.localStorage.removeItem(id)
	}
	else if (val == 1) {
		return JSON.parse(window.localStorage.getItem(id))
	}
	else if (id) { return window.localStorage.getItem(id) }
	else { window.localStorage.clear(); location.reload() }
	if (emi('userdata') && settings) {
		emi('userdata').value = JSON.stringify(settings)
	}
}
// Set a global CSS letiable
function pattern(CSSVar, val) { document.documentElement.style.setProperty('--'+CSSVar, val) }
// Remove elements
function rm(...ids) {
	ids.forEach(function(id) {
		if ( emi(id) ) {
			emi(id).remove()
		} else { log('rm :: Element with id ['+id+'] does not exist', 1) }
	})
}
// Make one or more elements in the selected root element; [data == html/object/element]
function mk(root_id, data) {
	let root = emi(root_id)
	if ( root ) {
		if (typeof data === 'object') {
			for (let i in data) {
				root.innerHTML = root.innerHTML + data[i]
			}
		} else if (typeof data === 'string') {
			root.innerHTML = root.innerHTML + data
		} else {
			root.appendChild(data)
		}
	} else { log('mk :: Root element with id ['+root_id+'] does not exist', 1) }
}
// Show/hide an element (display)
function show(id, int_display) {
	const disp = ['block', 'flex', 'grid']
	if (emi(id)) {
		if (int_display) {
			emi(id).style.display = disp[int_display]
		} else { emi(id).style.display = disp[0] }
	} else { log(`show :: Element with id [${id}] does not exist`, 1) }
}
function hide(...ids) {
	ids.forEach(function(id) {
		if (emi(id)) {
			emi(id).style.display = 'none'
		} else { log(`show :: Element with id [${id}] does not exist`, 1) }
	})
}
// Toggle visibility (display) of an element
function trig(id, display) {
	if (emi(id)) {
		if (emi(id).style.display=='none') { emi(id).style.display = (display || 'block') }
		else { emi(id).style.display = (display || 'none') }
	} else { log(`trig :: Element with id [${id}] does not exist`, 1) }
}
// Set animation for the element, remove on timeout if set
function a8(id, animation, timeout) {
	let a8em = emi(id)
	if (a8em) {
		a8em.style.animation = animation
		if (timeout) { setTimeout( function() { a8em.style.animation = null }, timeout ) }
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Add a switch-state expression to an element and assign 2 animations to it
function a8ss(id, a8A, a8B) {
	let a8em = emi(id)
	if ( a8em ) {
		if ( !a8em.value || a8em.value === 'false' ) {
			a8em.style.animation = a8A
			a8em.value = 'true'
		}
		else if ( a8em.value === 'true' ) {
			a8em.style.animation = a8B
			a8em.value = 'false'
		}
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Language switch function, usage:
//1. Set and fill the [lang_list] array --> lang_list = ['en', 'jp']
//2. Create corresponding objects in [assets] --> assets.en = {}; assets.jp = {}
//3. Create a bunch of elements with equal incrementing ids --> 'text1', 'text2'
//4. Set data associated with created ids --> assets.en.text = { 1: 'hello', 2: 'cat' }
let lang; let i_lang = -1
function langs_Userset() {
	if (lang=='en') {
		if (emi('lang')) { emi('lang').innerHTML = 'English' }
		for (let v of classes('saveBtn')) { v.innerHTML = 'Save' }
		for (let v of classes('loadBtn')) { v.innerHTML = 'Apply' }
		emi('tileName').placeholder = 'Bookmark name'
		emi('tileUrl').placeholder = 'Bookmark address (URL)'
	}

	if (lang=='jp') {
		if (emi('lang')) { emi('lang').innerHTML = '日本語' }
		for (let v of classes('saveBtn')) { v.innerHTML = '保存する' }
		for (let v of classes('loadBtn')) { v.innerHTML = '応募する' }
		emi('tileName').placeholder = 'ブックマーク名'
		emi('tileUrl').placeholder = 'ブックマークアドレス（URL）'
	}

	if (lang=='ru') {
		if (emi('lang')) { emi('lang').innerHTML = 'Русский' }
		for (let v of classes('saveBtn')) { v.innerHTML = 'Сохранить' }
		for (let v of classes('loadBtn')) { v.innerHTML = 'Применить' }
		emi('tileName').placeholder = 'Имя закладки'
		emi('tileUrl').placeholder = 'Адрес закладки (URL)'
		
		pattern('font', 'Montserrat')
	} else { pattern('font', 'NotoSansJP') }

	twemojiParse()
}
function langs(name_optional) {
	if (!name_optional) {
		if (i_lang < lang_list.length-1) { i_lang++ } else { i_lang = 0 }
		lang = lang_list[i_lang]
	} else {
		lang = name_optional
		i_lang = lang_list.indexOf(name_optional)
	}
	for (let sector in assets[lang]) {
		for (let i in assets[lang][sector]) {
			if ( emi(sector+i) ) { emi(sector+i).innerHTML = assets[lang][sector][i] }
		}
	}
	if (emi('lang')) { emi('lang').innerHTML = lang.toUpperCase() }
	emi('html').lang = lang
	
	//Userset
	langs_Userset()
}
// Set functions for device type
function vport(func_desktop, func_mobile) {
	let h = window.innerHeight
	let w = window.innerWidth
	if ( percent(h, w) > 100 ) { func_mobile() }
	else { func_desktop() }
}
// Embed a script into HTML
function require(source) {
	let script = document.createElement('script')
	script.id = 'embeddedScript_'+uid()
	script.src = source
	document.documentElement.appendChild(script)
}
// Load JS script / CSS sheet from a string
function loadstring(str) {
	let uid = 'loadstring-temp_script'
	if (emi(uid)) { emi(uid).remove() }
	let script = document.createElement('script')
	script.id = uid
	script.innerHTML = str
	document.documentElement.appendChild(script)
}
function loadsheet(str) {
	let uid = 'loadsheet-temp_sheet'
	if (emi(uid)) { emi(uid).remove() }
	let style = document.createElement('style')
	style.id = uid
	style.innerHTML = str
	document.documentElement.appendChild(style)
}
// Download a file from url
function curl(url) {
	let anchor = document.createElement('a')
	anchor.setAttribute('href', url)
	anchor.setAttribute('download', '')
	document.body.appendChild(anchor)
	anchor.click()
	anchor.parentNode.removeChild(anchor)
}
// Create and download a file from string
function doFile(str_name, str_data) {
	let link = document.createElement('a');
	link.download = str_name;
	let blob = new Blob([str_data], {type: 'text/plain'});
	link.href = window.URL.createObjectURL(blob);
	link.click(); link.remove()
}
// Slider widget function
//1. Create a bunch of elements with equal incrementing ids --> 'cat1', 'cat2', 'cat3'
//2. Initiate them in the body.onload() --> slide('cat', 1, 3)
//3. Set styles for given elements --> .cats.slide {display: block}; .cats.slided {display: none}
const slides = {}
function slide(id, dir, _init) {
	// Create [slides] and slides[id] arrays if they doesn't exist
	if (!slides[id] && _init) { slides[id]=[]; for (let i=0; i<(_init+1); i++) { slides[id].push(i) } }
	if (dir=='R') { // Change class for this [id] and switch to next
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]+1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		} else { // If next [id] doesn't exist, set index to 1 and change class
			slides[id][0] = 1
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		}
	}
	if (dir=='L') { // Change class for this [id] and switch to previous
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideL", "slideR")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]-1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		} else { // If previous [id] doesn't exist, set index to [max] and change class
			slides[id][0] = (slides[id].length-1)
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		}
	}
	// Check if [id] with [dir] index exists and change classes for this and selected [id]
	if (typeof dir=='number' && emi(id+dir)) {
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = dir
		emi(id+slides[id][0]).classList.remove("slided")
		emi(id+slides[id][0]).classList.add("slide")
	} //2022.11.05 :: Assigns 3 classes, clears animation states
}
// Generate a simple unique id
function uid() {
	return 'x'+ Number(Math.floor(Math.random() * 0xFFFF)).toString(32) +'x'+ Math.floor(Math.random() * 0xFF)
}
// Pops up a notification (timed div) with id ["popupNotification"] and assigned message
function notify(msg_html) {
	let id = 'popupNotification'
	if (emi(id)) {
		hide(id)
		void emi(id).offsetWidth //reflow
		show(id)
		emi(id).innerHTML = msg_html
	} else { log(`notify :: Element with id [${id}] does not exist`, 1) }
}
function iframe(url) {
	let template = `
	<div id='i-${url}' class='fill tabFrame center'>
		<iframe src='${url}' class='fill'></iframe>
		<div class='center nosel' onclick="rm('i-${url}')">
			<p class='material-symbols-outlined'>close</p>
		</div>
	</div>`
	mk('body', template)
	if (lang==='en') {
		notify('If webpage did not respond - it does not support embedding.')
	}
	if (lang==='jp') {
		notify('ウェブページが応答しない場合は、埋め込みをサポートしていません。')
	}
	if (lang==='ru') {
		notify('Если веб-страница не ответила - она не поддерживает встраивание.')
	}
}
function twemojiParse() {
	if (twemoji) {
		twemoji.parse(document.documentElement, {folder: 'svg', ext: '.svg'})
	}
}
var links = {}
function linkEmbed(root_id, url) {
	fetch('https://api.linkpreview.net/?key=94c58b8c0c040e83a680020f8da01141&q='+url)
	.then(raw => raw.text())
	.then(json => {
		let data = JSON.parse(json)
		let template = `
		<div id='embed-${url}' class='linkEmbed center c' onclick="href('${url}',1)">
			<h2>${data.title}</h2>
			<a class='text ref'>${data.url}</a>
			<img class='nosel nil' src='${data.image}' alt='(preview)'>
			<p>${data.description}</p>
		</div>`
		mk(root_id, template)
		links[root_id] = template
		ls('embeds', links)
		print('URL embed cached: '+url)
	})
}

/// Local functions ///
function udata(key, val) {
	settings[key] = val
	ls('settings', settings)
}

function tile(url, name) {
	let template = `
			<div id='${url}' class='center tabTile bounded'>
				<div class='tileThumb' style='background-image: url("https://s2.googleusercontent.com/s2/favicons?domain_url=${url}")'></div>
				<div class='tileName nosel'>${name}</div>
				<div class='fill tileControls'>
					<i1><iX class='material-symbols-outlined' onclick="tile('${url}', 0)">close</iX></i1>
					<i2><iX class='material-symbols-outlined' onclick="hide('tileGrid'); iframe('${url}')">fullscreen</iX></i2>
					<i3><iX class='material-symbols-outlined' onclick="href('${url}', 1)">open_in_new</iX></i3>
				</div>
			</div>`

	if (!url) { // Loop through existing list
		for (const [url, name] of Object.entries(settings.tiles)) {
			let template = `
			<div id='${url}' class='center tabTile bounded'>
				<div class='tileThumb' style='background-image: url("https://s2.googleusercontent.com/s2/favicons?domain_url=${url}")'></div>
				<div class='tileName nosel'>${name}</div>
				<div class='fill tileControls'>
					<i1><iX class='material-symbols-outlined' onclick="tile('${url}', 0)">close</iX></i1>
					<i2><iX class='material-symbols-outlined' onclick="hide('tileGrid'); iframe('${url}')">fullscreen</iX></i2>
					<i3><iX class='material-symbols-outlined' onclick="href('${url}', 1)">open_in_new</iX></i3>
				</div>
			</div>`
			emi('tileGrid').innerHTML = emi('tileGrid').innerHTML + template
		}
	}
	else if (name === 0) { // Remove an entry from the list
		delete settings.tiles[url]
		rm(url); ls('settings', settings)
		hide('tileGrid'); wait(200, "show('tileGrid')")
	}
	else { // Add new entry to the list
		settings.tiles[url] = name
		ls('settings', settings)
		emi('tileGrid').innerHTML = emi('tileGrid').innerHTML + template
		emi('tileName').value = ''
		emi('tileUrl').value = 'https://'
	}
}

function theme(binary) {
	if (binary == 0) { // Bright
		pattern('a', '#f35')
		pattern('aSub', '#47b')
		pattern('aFont', '#777')
		pattern('aFontSub', '#ccc')
		pattern('aFontHov', '#444')
		pattern('aFontBg', '#fff')
		pattern('aBg', '#fff')
		pattern('aBgSub', '#fffd')
		pattern('aBgHov', '#ddd')
		pattern('aBorder', '#eee')
	} else { // Dark
		pattern('a', '#fb6')
		pattern('aSub', '#c56')
		pattern('aFont', '#999')
		pattern('aFontSub', '#555')
		pattern('aFontHov', '#ccc')
		pattern('aFontBg', '#000')
		pattern('aBg', '#222')
		pattern('aBgSub', '#222d')
		pattern('aBgHov', '#444')
		pattern('aBorder', '#333')
	}
}

function openweather() {
	const kelvin = 273
	// API key
	const api = "6692e3cbbc1138e8c92b0d56c9afe4fe"
	// API URL
	const base = `https://api.openweathermap.org/data/2.5/weather?id=${settings.cityID}&appid=${api}`

	// Calling the API
	fetch(base)
	.then((response) => { return response.json() })
	.then((data) => {
		//console.log(data)
		var temperature = `<p style="font: 300 calc(2vmin + 3vh) var(--font)">` + Math.floor(data.main.temp - kelvin) + ' °C</p>'
		var summary = '<p>' + data.weather[0].description + '</p>'
		var citydata = '<p>' + data.name + ', ' + data.sys.country + '</p>'
		var br = "<div class='break'></div>"
		//var icon = `<img src="icons/${data.weather[0].icon}.svg" style='height:10rem' />`
		emi('weatherAPI').innerHTML = temperature+summary+citydata+br
	})
}

function init() {
	vport(
		function(){ //desktop
			pattern('panelWidth', '50vmin')
			
		},
		function(){ // mobile
			pattern('panelWidth', '85vw')
			
		}
	)
	if (!CSS.supports('height: 100dvh')) {
		pattern('deviceHeight', window.innerHeight+'px')
	}
}

var settings = {
	cityID: '1850144',
	tileSize: 1.5,
	rounding: 2,
	language: 'en',
	theme: 0,
	tiles: {/* url: name_or_nil, */},
}
window.onload = function() { init()
	// Deploy userdata if none
	if (!ls('settings')) {
		linkEmbed('version', 'https://github.com/eimirein')
		ls('settings', settings)
	} else {
		settings = ls('settings', 1)
		links = ls('embeds', 1)
		for (const [i,v] of Object.entries(links)) { mk(i,v) }
	}

	// Load local userdata
	emi('userdata').value = JSON.stringify(settings)
	emi('cityID').value = settings.cityID
	pattern('tileSize', settings.tileSize)
	emi('tileSize').value = settings.tileSize
	pattern('rounding', settings.rounding+'vh')
	emi('rounding').value = settings.rounding
	theme(settings.theme)

	langs(settings.language); openweather()

	if (lang=='en') { notify('Welcome! Point on the left side to open settings.') }
	if (lang=='jp') { notify('いらっしゃいませ！ 左側をポイントして設定を開きます。') }
	if (lang=='ru') { notify('Добро пожаловать! Отведите курсор влево чтобы открыть настройки.') }

	tile()

	// [manifest.json] PWA Service Worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./serviceworker.js')
		.then(function(registration) {
		// Registration was successful
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}).catch(function(err) {
		// Registration failed :(
		console.log('ServiceWorker registration failed: ', err)
		})
	}

	setInterval(function () {
		emi('va2time').innerHTML = time()
		emi('va2date').innerHTML = date()
		emi('va2pass').innerHTML = assets[lang].clock[0] + timeElapsed()
	}, 1000)
	window.addEventListener('resize', function(){ init() }, false)
}
