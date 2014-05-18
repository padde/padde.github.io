var ready = function() {
  $(".video").fitVids({ customSelector: "" });
}

$(document).ready(ready);
$(document).on('page:load', ready);
