// Can't use ERB style in an .erb file!
_.templateSettings = {
    evaluate:    /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    escape:      /\{\{-([\s\S]+?)\}\}/g
};
