from flask import Flask
from flask import request
from flask import url_for, redirect
import requests
import time
import json
from PIL import Image
from StringIO import StringIO
from get_depth import query_depth

app = Flask(__name__)

@app.route('/depth', methods=['GET', 'POST'])
def save():
    if request.method == 'POST':
		print "Yes"
		print request.form
		url = request.form['data']
		print url
		response = requests.get(url)
		img = Image.open(StringIO(response.content))
		img.save('input/tmp.jpg')
		query_depth('input', 'output', 'depthest')
		im = Image.open('output_abs/tmp.png')
		im.save('static/tmp.jpg')
		return "http://13.82.96.191:8080/static/tmp.jpg"		
    else:
		return "hello world"
        
@app.route('/access/<fname>')
def home(fname):
	print fname
	return redirect(url_for('static', filename=fname))


app.run(host="0.0.0.0", port=8080)
