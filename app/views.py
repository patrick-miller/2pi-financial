from flask import render_template, url_for, redirect

from main import app, nav, db
from forms import EmailForm
from models import Email


# Navigation bars
nav.Bar('mvp', [
    nav.Item('Home', 'home'),
    nav.Item('FAQ', 'faq'),
    nav.Item('About', 'about'),
    nav.Item('Request access', 'access')
])


@app.route('/', methods=['GET', 'POST'])
def home():
    return "Hello World from Flask in a uWSGI Nginx Docker container with \
        Python 3.6 (from the example template)"
    form = EmailForm()
        
    if form.validate_on_submit():                        
        dat = {'email': form.email.data}    
        email = Email.create(**dat)
        
        return redirect(url_for('access'))
        
    return render_template('home.html', form=form)


@app.route('/access')
def request_access():
    return render_template('access.html')
    
    
@app.route('/faq')
def faq():
    return render_template('faq.html')


@app.route('/about')
def faq():
    return render_template('faq.html')

    
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
    