FROM tiangolo/uwsgi-nginx-flask:python3.6

ENV ENV=development
ADD requirements /etc/requirements
RUN pip install -r /etc/requirements

