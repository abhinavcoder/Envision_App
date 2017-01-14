from flask import Flask
from flask import request
from flask import url_for, redirect

import time
app = Flask(__name__)

@app.route('/save', methods=['GET', 'POST'])
def save():
    if request.method == 'POST':
		d = request.form['data']
		print(d)
		name = "static/" + str(int(time.time())) + ".png"
		fh = open(name, "wb")
		fh.write(d.decode('base64'))
		fh.close()
		return name
    else:
		return "hello world"
        
@app.route('/access/<fname>')
def home(fname):
	print fname
	return redirect(url_for('static', filename=fname))