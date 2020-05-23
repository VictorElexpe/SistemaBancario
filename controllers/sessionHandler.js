exports.redirectLogin = function(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
        next();
    }
}

exports.redirectHome = function(req, res, next) {
    if (req.session.userId && req.session.user.employeeCode) {
        res.redirect('/employee/dashboard')
    } else if(req.session.userId && !req.session.user.employeeCode) {
        res.redirect('/client/dashboard')
    } 
    else {
        next();
    }
}

exports.logout = function(req, res, next) {    
    req.session.destroy(err => {
        res.clearCookie('sid')
        res.redirect('/')
    });
}