Template.layout.helpers({
	pageTitle: function () {
		// if (Session.get('pageTitle') == null || Session.get('pageTitle') == '' || Session.get('pageTitle') == 'undefined')
		if (!Session.get('pageTitle'))
			// Session.set('pageTitle', 'Microscope');
			Session.setDefault('pageTitle', 'Microscope');
			
		return Session.get('pageTitle');
	}
});