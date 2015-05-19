/**
 * Created by Андрей on 19.05.2015.
 */
"use strict";

var FLUFFY = {

    // return correct type of passed object
    // Only for JavaScript types like "someString", true/false, {} ... etc.
    "classOf": function (o) {
        if(o === null) {
            return "Null";
        }
        if(o === undefined) {
            return "Undefined";
        }
        return Object.prototype.toString.call(o).slice(8, -1);
    },

    // Return file extension (pdf, doc, xls etc.)
    // Only for link-tags or img-tags
    "getExtension" : function (selector) {
        if(arguments.length !== 1) {
            throw new Error("Error! passed "+ arguments.length +" arguments instead of 1.");
        }
        if(this.classOf(selector) !== "String") {
            throw new Error("Error! Expect string, passed: " + this.classOf(selector)+".");
        }

        var firstSymbol = selector.charAt(0),
            el,
            result = "",
            getExt = function (attr) {
                var src = "",
                    ext = "",
                    r   = "";
                src = el.getAttribute(attr);
                ext = ( /[.]/.exec(src) ) ? /[^.]+$/.exec(src) : undefined;

                return ext;
            },
            getAttr = function (el) {
                var r = "";
                if ( el.nodeName === "A" ){
                    if ( el.hasAttribute("href") ) {
                        result = getExt("href");
                    } else {
                        throw new Error("Error! Can't get 'href' attribute.");
                    }

                } else if ( el.nodeName === "IMG" ) {
                    if (el.hasAttribute("src")) {
                        result = getExt("src");
                    } else {
                        throw new Error("Error! Can't get 'src' attribute.");
                    }
                }
                return r;
            };

        // if first symbol in passed argument is "." this is a "class"
        // if it "class" it may be an array
        if(firstSymbol === ".") {

            selector = selector.slice(1);
            el = document.getElementsByClassName(selector);
            for( var i = 0; i < el.length; i++ ) {
                
            }

        }
        // if first symbol in passed argument is "#" this is "id";
        else if ( firstSymbol === "#" ) {
            selector = selector.slice(1);
            el = document.getElementById(selector);

            // nodeName of an element may be "a" and "img" only
            result = getAttr(el);

        } else {
            throw new Error("Error! Passed argument is not a 'class' or 'id'");
        }
        return result;
    },

    "getSize": function (selector) {

        if(arguments.length !== 1) {
            throw new Error("Error! passed "+ arguments.length +" arguments instead of 1.");
        }
        if(this.classOf(selector) !== "String") {
            throw new Error("Error! Expect string, passed: " + this.classOf(selector)+".");
        }

        var el,
            correctSize = 0;
        selector = selector.slice(1);
        correctSize = parseInt(document.getElementById(selector).childNodes[0].data);

        return (correctSize / 1024 / 1024).toFixed(2);
    }
};
