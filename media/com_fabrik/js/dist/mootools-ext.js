/*! Fabrik */

function CloneObject(t,n,i){return"object"!==typeOf(t)?t:($H(t).each(function(t,e){"object"!==typeOf(t)||!0!==n||i.contains(e)?this[e]=t:this[e]=new CloneObject(t,n,i)}.bind(this)),this)}var slice=Array.prototype.slice;Array.mfrom=function(t){return null==t?[]:Type.isEnumerable(t)&&"string"!=typeof t?"array"==typeOf(t)?t:slice.call(t):[t]},String.implement({toObject:function(){var n={};return this.split("&").each(function(t){var e=t.split("=");n[e[0]]=e[1]}),n}});var mHide=Element.prototype.hide,mShow=Element.prototype.show,mSlide=Element.prototype.slide;Element.implement({findClassUp:function(t){if(this.hasClass(t))return this;for(var e=document.id(this);e&&!e.hasClass(t);){if("element"!==typeOf(e.getParent()))return!1;e=e.getParent()}return e},up:function(t){t=t||0;for(var e=this,n=0;n<=t;n++)e=e.getParent();return e},within:function(t){for(var e=this;null!==e.parentNode;){if(e===t)return!0;e=e.parentNode}return!1},cloneWithIds:function(t){return this.clone(t,!0)},down:function(t,e){var n=this.getChildren();return 0===arguments.length?n[0]:n[e]},findUp:function(t){if(this.get("tag")===t)return this;for(var e=this;e&&e.get("tag")!==t;)e=e.getParent();return e},mouseInside:function(t,e){var n=this.getCoordinates(),i=n.left,o=n.left+n.width,r=n.top,s=n.bottom;return i<=t&&t<=o&&r<=e&&e<=s},getValue:function(){return this.get("value")},hide:function(t){if(void 0===typeof t){if(void 0===this.parentNode.dataset.modalContent&&void 0===this.dataset.modalContent&&3<=Fabrik.bootstrapVersion("modal"))return;if(this.hasClass("mootools-noconflict"))return this}mHide.apply(this,arguments)},show:function(t){if(this.hasClass("mootools-noconflict"))return this;mShow.apply(this,t)},slide:function(t){if(this.hasClass("mootools-noconflict"))return this;mSlide.apply(this,t)}});