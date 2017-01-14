from flask import Flask
from flask import request
from flask import url_for, redirect
import requests
import time
import json

app = Flask(__name__)

@app.route('/save', methods=['GET', 'POST'])
def save():
    if request.method == 'POST':
		d = request.form['data']
		print(d)
		fname = str(int(time.time())) + ".png"
		name = "static/" + fname
		fh = open(name, "wb")
		fh.write(d.decode('base64'))
		fh.close()
		r= requests.post("http://vqa.daylen.com/api/upload_image", files={'file':(fname,open(name))})
		json.loads(r.text)['img_id']
		return json.dumps({'img_id': json.loads(r.text)['img_id'], 'local': name})
    else:
		return "hello world"
        
@app.route('/access/<fname>')
def home(fname):
	print fname
	return redirect(url_for('static', filename=fname))