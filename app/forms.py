from flask.ext.wtf import Form
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

from models import Email


class EmailForm(Form):
    email = StringField('Email', validators=[DataRequired(), Email()])

    def validate_email(form, field):
        user = User.query.filter(User.email == field.data).first()
        if user is not None:
            raise ValidationError("A user with that email already exists")
            