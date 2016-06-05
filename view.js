function turn (elem) {
	var cls = elem.className;
	var n = elem.id.split('_')[1];
	//console.log(n);
	//如果点击的不是最中间的就重新排序
	if(!/photo_center/.test(cls)){
        return rsort(n);
	}
	if(/photo_front/.test( cls )){
		cls = cls.replace(/photo_front/,'photo_back');
	}
	else{
		cls = cls.replace(/photo_back/,'photo_front');
	}
	return elem.className = cls;
}
function g (selector) {
	var method = selector.substr(0,1) == '.' ? 'getElementsByClassName' :  'getElementById';
    //console.log(123);
	//console.log(document[method](selector.substr(1)));
	return document[method](selector.substr(1));
}
//从data.js获取所有数据
var data = data;
//console.log(data);
function addPhotos () {
	var template = g('#wrap').innerHTML;
	//console.log(g('#wrap'));
	var html = [];
	var nav = []; 
	for(s in data){
		var _html = template
		                .replace('{{index}}',s)
		                .replace('{{img}}',data[s].img)
		                .replace('{{caption}}',data[s].caption)
		                .replace('{{desc}}',data[s].desc);
		html.push(_html);  
		nav.push('<span id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))" class="i">&nbsp;</span>');
	}
	html.push('<div class="nav">'+nav.join('')+'</div>');
	g('#wrap').innerHTML = html.join('');
	rsort(random([0,data.length-1]));
}
addPhotos();
function range () {
	var range = {left:{x:[],y:[]},right:{x:[],y:[]}};
	//获取总共图片库宽高和每个菜样宽高
	var wrap = {
		w:g("#wrap").clientWidth,
		h:g("#wrap").clientHeight
	}
	var photo = {
		w:g('.photo')[0].clientWidth,
		h:g('.photo')[0].clientHeight
	}
	range.wrap = wrap;
	range.photo = photo;
	range.left.x = [ 0-photo.w,wrap.w/2-photo.w/2 ];
	range.left.y = [ 0-photo.h,wrap.h ];
	range.right.x = [ wrap.w/2 + photo.w/2,wrap.w + photo.w ];
	range.right.y = range.left.y;
	return range;
}
function rsort (n) {
	//获取所有菜样
	var _photo = g('.photo');
	//console.log(_photo);
	var photos = [];
	for(var s = 0;s < _photo.length;s++){
		//所有初始化
		_photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/,' ');
		_photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/,' ');
		_photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/,' ');
		_photo[s].className += ' photo_front';
		_photo[s].style.left = '';
		_photo[s].style.top = '';
		_photo[s].style['-webkit-transform'] = 'rotate(0deg)';
		photos.push(_photo[s]);
	}
	var photo_center = g("#photo_"+n);
	photo_center.className += ' photo_center';
	//获取点击的菜样
	photo_center = photos.splice(n,1)[0];
	//console.log(photo_center);
	//给左边分配一半
	var photos_left = photos.splice(0,Math.ceil(photos.length/2));
	//右边是剩余量
	var photos_right = photos;
	var ranges = range();
	for( s in photos_left){
        var photo = photos_left[s];
	    photo.style.left = random(ranges.left.x) + 'px';
	    photo.style.top = random(ranges.left.y) + 'px';
	    photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';
	}
	for( s in photos_right){
        var photo = photos_right[s];
	    photo.style.left = random(ranges.right.x) + 'px';
	    photo.style.top = random(ranges.right.y) + 'px';
	    photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';
	}
}
function random (range) {
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);
	var diff = max-min;
	var number = Math.ceil(Math.random() * diff +  min);
	return number;
}

