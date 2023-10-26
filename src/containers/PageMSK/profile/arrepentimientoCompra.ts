import jQuery from "jquery";

export function trimBoth(str: string) {
  return jQuery.trim(str);
}
export function setAllDependancyFieldsMapping() {
  var mapDependancyLabels = getMapDependenySelectValues(
    jQuery("[id='property(module)']").val(),
    "JSON_MAP_DEP_LABELS"
  );
  if (mapDependancyLabels) {
    for (var i = 0; i < mapDependancyLabels.length; i++) {
      var label = mapDependancyLabels[i];
      var obj = document.forms["zsWebToCase_740111000002566679" as any][label];
      if (obj) {
        setDependent(obj, true);
      }
    }
  }
}

export function setDependent(obj: any, isload: any) {
  if (!obj.id) return;
  var name = obj.id || (obj[0] && obj[0].id) || "";
  var module = jQuery("[id='property(module)']").val();
  var val = "";
  var myObject = getMapDependenySelectValues(module, "JSON_VALUES");
  if (myObject != undefined) {
    val = myObject[name];
  }
  var mySelObject = getMapDependenySelectValues(module, "JSON_SELECT_VALUES");
  if (val != null && val != "" && val != "null" && mySelObject) {
    var fields = val;
    for (var i in fields as any) {
      if (fields.hasOwnProperty(i)) {
        var isDependent = false;
        var label = i;
        var values = fields[i as keyof typeof fields];
        if (label.indexOf(")") > -1) {
          label = label.replace(/\)/g, "_____");
        }
        if (label.indexOf("(") > -1) {
          label = label.replace(/\(/g, "____");
        }
        if (label.indexOf(".") > -1) {
          label = label.replace(/\./g, "___");
        }
        var depObj =
          document.forms["zsWebToCase_740111000002566679" as any][label];
        if (depObj && depObj.options) {
          var mapValues = "";
          var selected_val = depObj.value;
          var depLen = depObj.options.length - 1;
          for (var n = depLen; n >= 0; n--) {
            if (depObj.options[n].selected) {
              if (mapValues == "") {
                mapValues = depObj.options[n].value;
              } else {
                mapValues = mapValues + ";;;" + depObj.options[n].value;
              }
            }
          }
          depObj.value = "";
          var selectValues = mySelObject[label];
          for (var k in values as any) {
            var rat = k;
            if (rat == "-None-") {
              rat = "";
            }
            var parentValues = mySelObject[name];
            if (rat == trimBoth(obj.value)) {
              isDependent = true;
              depObj.length = 0;
              var depvalues: any = values[k as keyof typeof values];
              var depLen = depvalues.length - 1;
              for (var j = 0; j <= depLen; j++) {
                var optionElement: any = document.createElement("OPTION");
                var displayValue = depvalues[j];
                var actualValue = displayValue;
                if (actualValue == "-None-") {
                  optionElement.value = "";
                  displayValue = "-None-";
                } else {
                  optionElement.value = actualValue;
                }
                optionElement.text = displayValue;
                if (mapValues != undefined) {
                  var mapValue = mapValues.split(";;;");
                  var len = mapValue.length;
                  for (var p = 0; p < len; p++) {
                    if (actualValue == mapValue[p]) {
                      optionElement.selected = true;
                    }
                  }
                }
                depObj.options.add(optionElement);
              }
            }
          }
          if (!isDependent) {
            depObj.length = 0;
            var len: number = selectValues.length;
            for (var j = 0; j < len; j++) {
              var actualValue = selectValues[j];
              var optionElement: any = document.createElement("OPTION");
              if (actualValue == "-None-") {
                optionElement.value = "";
              } else {
                optionElement.value = selectValues[j];
              }
              optionElement.text = selectValues[j];
              depObj.options.add(optionElement);
            }
            depObj.value = selected_val;
          }
          if (!isload) {
            setDependent(depObj, false);
          }
          var jdepObj = jQuery(depObj) as any;
          if (jdepObj.hasClass("select2-offscreen")) {
            jdepObj.select2("val", jdepObj.val());
          }
        }
      }
    }
  }
}

export function getMapDependenySelectValues(module: any, key: any) {
  var dependencyObj = jQuery.parseJSON(
    jQuery("[id='dependent_field_values_" + module + "']").val() as any
  );
  if (dependencyObj == undefined) {
    return dependencyObj;
  }
  return dependencyObj[key];
}

export function setSelectAll(id: any) {
  var parentElement: any = document.getElementById(id);
  var hiddenInput = parentElement.querySelector("#hiddenoptions");
  var selectAllElement = parentElement.querySelector("#selectall" + id);
  var selectedValues: any = [];
  var checkboxes = parentElement.querySelectorAll(".wb_multi_pick_input");
  checkboxes.forEach(function (cb: any) {
    cb.checked = selectAllElement.checked;
    if (cb.checked && cb.value) {
      selectedValues.push(cb.value);
    }
  });
  hiddenInput.value = selectedValues.join(",");
}

export function setMultiSelectOption(id: any, obj: any) {
  var parentElement: any = document.getElementById(id);
  var hiddenInput = parentElement.querySelector("#hiddenoptions");
  var selectAllElement = parentElement.querySelector("#selectall" + id);
  var selectedStr = hiddenInput.value;
  var selectedValues = selectedStr ? selectedStr.split(",") : [];
  if (obj.checked && obj.value) {
    selectedValues.push(obj.value);
  } else if (!obj.checked && obj.value) {
    selectedValues.splice(selectedValues.indexOf(obj.value), 1);
    selectAllElement.checked = false;
  } else {
    selectAllElement.checked = false;
  }
  hiddenInput.value = selectedValues.join(",");
}

export var zctt = (function () {
  var tt: any,
    mw = 400,
    top = 10,
    left = 0,
    doctt = document;
  var ieb = doctt.all ? true : false;
  return {
    showtt: function (cont: any, wid: any) {
      if (tt == null) {
        tt = doctt.createElement("div");
        tt.setAttribute("id", "tooltip-zc");
        doctt.body.appendChild(tt);
        doctt.onmousemove = this.setpos;
        doctt.onclick = this.hidett;
      }
      tt.style.display = "block";
      tt.innerHTML = cont;
      tt.style.width = wid ? wid + "px" : "auto";
      if (!wid && ieb) {
        tt.style.width = tt.offsetWidth;
      }
      if (tt.offsetWidth > mw) {
        tt.style.width = mw + "px";
      }
      let h = parseInt(tt.offsetHeight) + top;
      let w = parseInt(tt.offsetWidth) + left;
    },
    hidett: function () {
      tt.style.display = "none";
    },
    setpos: function (e: any) {
      var u = ieb ? e.clientY + doctt.body.scrollTop : e.pageY;
      var l = ieb ? e.clientX + doctt.body.scrollLeft : e.pageX;
      let w = parseInt(tt.offsetWidth) + left; // patch
      var h = parseInt(tt.offsetHeight) + top; // patch
      var cw = doctt.body.clientWidth;
      var ch = doctt.body.clientHeight;
      if (l < 0) {
        tt.style.left = left + "px";
        tt.style.right = "";
      } else if (l + w + left > cw) {
        tt.style.left = "";
        tt.style.right = cw - l + left + "px";
      } else {
        tt.style.right = "";
        tt.style.left = l + left + "px";
      }
      if (u < 0) {
        tt.style.top = top + "px";
        tt.style.bottom = "";
      } else if (u + h + left > ch) {
        tt.style.top = "";
        tt.style.bottom = ch - u + top + "px";
      } else {
        tt.style.bottom = "";
        tt.style.top = u + top + "px";
      }
    },
  };
})();

export var zsWebFormMandatoryFields = new Array(
  "First Name",
  "Contact Name",
  "Email",
  "Subject"
);
export var zsFieldsDisplayLabelArray = new Array(
  "Nombre",
  "Apellidos",
  "Correo electrónico",
  "Motivo de la solicitud"
);
export function zsValidateMandatoryFields() {
  var name = "";
  var email = "";
  var isError = 0;
  for (var index = 0; index < zsWebFormMandatoryFields.length; index++) {
    isError = 0;
    var fieldObject =
      document.forms["zsWebToCase_740111000002566679" as any][
        zsWebFormMandatoryFields[index]
      ];
    if (fieldObject) {
      if (fieldObject.value.replace(/^\s+|\s+$/g, "").length == 0) {
        alert(zsFieldsDisplayLabelArray[index] + " no puede estar vacío ");
        fieldObject.focus();
        isError = 1;
        return false;
      } else {
        if (fieldObject.name == "Email") {
          if (
            !fieldObject.value.match(
              /^([\w_][\w\-_.+\'&]*)@(?=.{4,256}$)(([\w]+)([\-_]*[\w])*[\.])+[a-zA-Z]{2,22}$/
            )
          ) {
            isError = 1;
            alert("Introduzca una ID de correo electrónico válida");
            fieldObject.focus();
            return false;
          }
        }
      }
      if (fieldObject.nodeName == "SELECT") {
        if (fieldObject.options[fieldObject.selectedIndex].value == "-None-") {
          alert(zsFieldsDisplayLabelArray[index] + " no puede ser nulo");
          fieldObject.focus();
          isError = 1;
          return false;
        }
      }
      if (fieldObject.type == "checkbox") {
        if (fieldObject.checked == false) {
          alert("Acepte por favor " + zsFieldsDisplayLabelArray[index]);
          fieldObject.focus();
          isError = 1;
          return false;
        }
      }
    }
  }
  if (isError == 0) {
    if (
      document.forms["zsWebToCase_740111000002566679" as any][
        "zsWebFormCaptchaWord"
      ].value.replace(/^\s+|\s+$/g, "").length == 0
    ) {
      alert("Introduzca el código captcha");
      document.forms["zsWebToCase_740111000002566679" as any][
        "zsWebFormCaptchaWord"
      ].focus();
      return false;
    }
  }
  if (isError == 0) {
    document
      .getElementById("zsSubmitButton_740111000002566679")!
      .setAttribute("disabled", "disabled");
  }
}
export function zsShowCaptcha() {
  jQuery("#zsCaptchaLoading").hide();
  jQuery("#zsCaptcha").show();
}
export function zsRegenerateCaptcha() {
  var webFormxhr: any = {};
  webFormxhr = new XMLHttpRequest();
  webFormxhr.open(
    "GET",
    "https://desk.zoho.com/support/GenerateCaptcha?action=getNewCaptcha&_=" +
      new Date().getTime(),
    true
  );
  webFormxhr.onreadystatechange = function () {
    if (webFormxhr.readyState === 4 && webFormxhr.status === 200) {
      try {
        var response =
          webFormxhr.responseText != null
            ? JSON.parse(webFormxhr.responseText)
            : "";
        // jQuery("#zsCaptchaUrl").load(zsShowCaptcha);
        const getCaptchaURL: any = document.getElementById("zsCaptchaUrl");
        const getCaptchaByName: any = document.getElementsByName("xJdfEaS")[0];
        getCaptchaURL!.src = response.captchaUrl;
        getCaptchaByName.value = response.captchaDigest;
      } catch (e) {
        console.log("Breaks", e);
      }
    }
  };
  webFormxhr.send();
}
document.addEventListener("readystatechange", function () {
  if (document.readyState === "complete") {
    ////////////////////////Captcha////////////////////////
    zsRegenerateCaptcha();
  }
  setAllDependancyFieldsMapping();
  document
    .getElementById("zsSubmitButton_740111000002566679")!
    .removeAttribute("disabled");
  let zsAttachedAttachmentsCount = 0;
  let zsAttachmentFileBrowserIdsList = [1, 2, 3, 4, 5];
  document.forms["zsWebToCase_740111000002566679" as any][
    "zsWebFormCaptchaWord"
  ].value = "";
});
function zsResetWebForm(webFormId: any) {
  document.forms[("zsWebToCase_" + webFormId) as any].reset();
  document
    .getElementById("zsSubmitButton_740111000002566679")!
    .removeAttribute("disabled");
  setAllDependancyFieldsMapping();
}
