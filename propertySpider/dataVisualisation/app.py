from flask import Flask, render_template
import geojson

app = Flask(__name__)

@app.route('/')
def index():
    # Load GeoJSON data from a file
    geojson_file_path = 'map.geojson'
    with open(geojson_file_path) as f:
        geojson_data = geojson.load(f)

    # Pass GeoJSON data to the template
    return render_template('map.html', geojson_data=geojson_data)

if __name__ == '__main__':
    app.run(debug=True)
