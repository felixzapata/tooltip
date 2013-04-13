//
// tooltip() is a tooltip widget. It requires the element that has the tooltip to reference
// the tooltip via aria-describedby. Normally this is a div that contains text
//
// @param ($id object) $id is the jquery object of the input or other element to bind the widget to
//
// @return N/A
//
function Tooltip($id) {

  // define the object properties

  this.$id = $id;
  this.$tip = $('#' + $id.attr('aria-describedby'));
  this.mouseover = false; // set to true of the tooltip was displayed via mouseover. reset on mouseout
  this.focus = false; // set to true of the input has focus (prevent hide on mouseout)
  this.dismissed = false; // set to true of the user dismissed the tooltip with the esc key. Reset on blur
  this.GAP = 0;
  this.KEY_ESC = 27;

   this.position = {
                  top: this.$id.position().top,
                  left: this.$id.position().left + this.$id.width() + this.GAP
  };

  this.$tip.attr("tabIndex", 0);



  // bind key handlers
  this.bindHandlers(this.$id);
  this.bindHandlers(this.$tip);
  this.bindBlurHandler(this.$tip);

   // perform initialization
   this.init();

} // end tooltip() constructor

//
// function init() is a member function to perform iniatialization for the widget.
//
// return N/A
//
Tooltip.prototype.init = function() {

  // hide the tooltip
  this.hideTip();

   // change the positioning of the tooltip to absolute
   this.$tip.css('position', 'absolute');

   // set the position of the tooltip
   this.$tip.css('top', this.position.top + 'px');
   this.$tip.css('left', this.position.left + 'px');

}; // end init()

// function showTip() is a member function to display the tooltip
//
// @return N/A
//
Tooltip.prototype.showTip = function() {

  // display the tooltip
  this.$tip.css('display', 'inline').attr('aria-hidden', 'false');

}; // end showtip()

//
// function hideTip() is a member function to hide the tooltip
//
// @return N/A
//
Tooltip.prototype.hideTip = function() {

  // hide the tooltip
  this.$tip.hide().attr('aria-hidden', 'true');

}; // end hidetip()


//
// function bindHandlers() is a member function to bind event handlers to the elements
//
// @return N/A
//
Tooltip.prototype.bindHandlers = function(element) {

  var thisObj = this;

  element.keydown(function(e) {
      return thisObj.handleKeyDown($(this), e);
  });

  element.mouseover(function(e) {
      return thisObj.handleMouseOver($(this), e);
  });

  element.mouseout(function(e) {
      return thisObj.handleMouseOut($(this), e);
  });

  element.focus(function(e) {
      return thisObj.handleFocus($(this), e);
  });


}; // end bindHandlers()

//
// function bindBlurHandler() is a member function to bind blur event to tooltip
//
// @return N/A
//
Tooltip.prototype.bindBlurHandler = function(element) {

  var thisObj = this;

  element.mouseout(function(e) {
      return thisObj.handleMouseOut($(this), e);
  });
  element.blur(function(e) {
      return thisObj.handleBlur($(this), e);
  });

}; // end bindBlurHandler()



//
// function handleKeyDown() is a member function to process keydown events for the input
//
// @param ($id object) $id is the jquery object of the element firing event
//
// @param (e object) e is the event object associated with the event
//
// @return (boolean) returns false if processing; true if doing nothing
//
Tooltip.prototype.handleKeyDown = function($id, e) {

  if (e.altKey || e.shiftKey || e.ctrlKey) {
    // do nothing
    return true;
  }

  if (e.keyCode == this.KEY_ESC) {
    this.hideTip();
    this.dismissed = true;
    e.stopPropagation();
    return false;
  }

  return true;

}; // end handleKeyDown()

//
// function handleMouseOver() is a member function to display the tooltip on mouseover
//
// @param ($id object) $id is the jquery object of the element firing event
//
// @param (e object) e is the event object associated with the event
//
// @return (boolean) returns false
//
Tooltip.prototype.handleMouseOver = function($id, e) {

  this.showTip();

  // set the mouseover flag to prevent blur dismissing tooltip
  this.mouseover = true;

  e.stopPropagation();
  return false;

}; // end handleMouseOver()

//
// function handleMouseOut() is a member function to hide the tooltip on mouseout. If the
// input has focus and the user did not dismiss the tooltip, the tooltip is not hidden.
//
// @param ($id object) $id is the jquery object of the element firing event
//
// @param (e object) e is the event object associated with the event
//
// @return (boolean) returns false
//
Tooltip.prototype.handleMouseOut = function($id, e) {

  if (this.dismissed === true || this.focus === false) {
    this.hideTip();
  }

  // reset the mouseover flag
  this.mouseover = false;

  e.stopPropagation();
  e.preventDefault();

}; // end handleMouseOut()

//
// function handleFocus() is a member function to display the tooltip on focus
//
// @param ($id object) $id is the jquery object of the element firing event
//
// @param (e object) e is the event object associated with the event
//
// @return (boolean) returns false
//
Tooltip.prototype.handleFocus = function($id, e) {

  this.showTip();

  // set the focus flag to prevent mouseout from hiding the tooltip as long
  // as the input has focus
  this.focus = true;

  e.stopPropagation();
  e.preventDefault();

}; // end handleFocus()

//
// function handleBlur() is a member function to hide the tooltip on blur. The tooltip is not
// hidden if the mouseover flag is true (i.e. tooltip was displayed via mouseover).
//
// @param ($id object) $id is the jquery object of the element firing event
//
// @param (e object) e is the event object associated with the event
//
// @return (boolean) returns false
//
Tooltip.prototype.handleBlur = function($id, e) {

  if (this.mouseover === false) {
    this.hideTip();
  }

  // reset the focus and dismissed flags
  this.focus = false;
  this.dismissed = false;

  e.stopPropagation();
  e.preventDefault();

}; // end handleBlur()
