/**
 * Created by Андрей on 19.05.2015.
 */
"use strict";

var FLUFFY = {
    self: this,
    // return correct type of passed object
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
    "getExtension" : function (selector) {
        if(arguments.length !== 1) {
            throw new Error("Error! passed "+ arguments.length +"arguments instead of 1.");
        }
        if(self.classOf(selector) !== "string") {
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
                switch (ext) {
                    case "pdf":
                        r = "pdf";
                        break;
                    case "doc" || "docx":
                        r = "doc";
                        break;
                    case "xls":
                        r = "xls";
                        break;
                    case "zip":
                        r = "zip";
                        break;
                    case "rar":
                        r = "rar";
                        break;
                    case "7z":
                        r = "7z";
                        break;
                    default :
                        r = "Can't get extension";
                        break;
                }
                return r;
            };

        // if first symbol in passed argument is "." this is a "class"
        // if it "class" it may be an array
        if(firstSymbol === ".") {
            el = document.getElementsByClassName(selector);
            /*
            *
            * Do something
            *
            * */

        }
        // if first symbol in passed argument is "#" this is "id";
        else if ( firstSymbol === "#" ) {
            el = document.getElementById(selector);

            // NodeType of an element may be "a" and "img" only
            if ( el.nodeType === "A" ){
                if ( el.hasAttribute("href") ) {
                    result = getExt("href");
                } else {
                    throw new Error("Error! Can't get 'href' attribute.");
                }

            } else if ( el.nodeType === "IMG" ) {
                if (el.hasAttribute("src")) {
                    result = getExt("src");
                } else {
                    throw new Error("Error! Can't get 'src' attribute.");
                }
            }
        } else {
            throw new Error("Error! Passed argument is not a 'class' or 'id'");
        }
    }
};