from flask import Flask
from flask import request
import time
app = Flask(__name__)

@app.route('/save', methods=['GET', 'POST'])
def save():
    if request.method == 'POST':
		d = request.form['data']
		print(d)
		name = str(int(time.time())) + ".png"
		fh = open(name, "wb")
		fh.write(d.decode('base64'))
		fh.close()
		return name
    else:
		return "hello world"
        
