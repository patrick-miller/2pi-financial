var vSpec = {
"width": 520,
"height": 360,
"padding": {"top": 10,"left": 60,"bottom": 40,"right": 170},
"signals": [
{
  "name": "index_date",
  "streams": [{
    "type": "mousemove",
    "expr": "clamp(eventX(), 0, eventGroup('root').width)",
    "scale": {"name": "xscale", "invert": true}
  }]
}
],
"data": [
{
  "name": "base_data",
  "url": "/static/mdata.csv",
  "format": {
    "type": "csv",
    "parse": {
      "date": "date",
      "next_date": "date",
      "SPValuationLevel": "string",
      "SPRealIndex": "number",
      "sp12fwd": "number",
      "sp120fwd": "number"
    }
  }
},
{
  "name": "date_summary_data",
  "source": "base_data",
  "transform": [
    {
      "type": "aggregate",
      "ops": ["min", "max"],
      "as": ["min_date", "max_date"]
    }
  ]
},
{
  "name": "index_date_lookup",
  "source": "base_data",
  "transform": [
    {
      "type": "filter",
      "test": "datum.date <= index_date && datum.next_date >= index_date"
    }
  ]        
}
],
"marks": [
{ 
  "name": "vertical_line",
  "type":"rule",
  "properties": {
    "update": {
      "x": {"scale": "xscale", "signal": "index_date"},
      "y": {"value": 0},
      "y2": {"field": {"group": "height"}},
      "stroke": {"value": "red"}
    }
  }
},
{     
  "name": "spx_line",
  "type": "line",
  "from": {
    "data": "base_data"
  },
  "properties": {
    "update": {
      "x": {"scale": "xscale","field": "date"},
      "y": {"scale": "yscale_spx","field": "SPRealIndex"},
      "strokeWidth": {"value": 1.5},
      "stroke": {"value": "black"}
    }
  }
},
{
  "type": "rect",
  "from": {"data": "base_data"},
  "properties": {
    "update": {
      "x": {"scale": "xscale", "field": "date"},
      "x2": {"scale": "xscale", "field": "next_date"},
      "y": {"value": 0},
      "y2": {"signal": "height"},
      "fill": {"scale": "colorscale", "field": "SPValuationLevel"},
      "opacity": {"value": 0.2}
    }
  }
},
{
  "type": "group",
  "from": {"data": "index_date_lookup"},
  "properties": {
    "update": {
      "x": {"scale": "xscale", "signal": "index_date", "offset": 5},
      "y": {"value": 100},
      "width": {"value": 160},
      "height": {"value": 60},
      "strokeWidth": {"value": 1},
      "stroke": {"value": "black"},
      "fill": {"value": "white"}
    }
  },
  "marks": [
  {
    "type": "text",
    "properties": {
      "update": {
        "x": {"value": 5},
        "y": {"value": 14},
        "fontSize": {"value": 14},
        "fill": {"value": "black"},
        "fontWeight": {"value": "bold"},
        "text": {
          "template": "valuation: {{parent.SPValuationLevel}}"
        }
      }
    }
  },
  {
    "type": "text",
    "properties": {
      "update": {
        "x": {"value": 5},
        "y": {"value": 30},
        "fontSize": {"value": 14},
        "fill": {"value": "black"},
        "text": {
          "template": "1yr return: {{parent.sp12fwd|number: '.1p'}}"
          }
        }
      }
    },        
    {
      "type": "text",
      "properties": {
        "update": {
          "x": {"value": 5},
          "y": {"value": 50},
          "fontSize": {"value": 14},
          "fill": {"value": "black"},
          "text": {
            "template": "10yr return: {{parent.sp120fwd|number: '.1p'}}"
            }
          }
        }
    }
  ]
}
],
"scales": [
{
  "name": "colorscale",
  "type": "ordinal",
  "domain": {"data": "base_data", "field": "SPValuationLevel"},
  "range": ["blue", "red", "green"] // {"expensive": "red", "cheap": "green", "fair": "blue"}
},
{
  "name": "xscale",
  "type": "time",
  "domain": {"fields": [
    {"data": "base_data", "field": "date"},
    {"data": "base_data", "field": "next_date"}
  ]},
  "range": "width",
  "zero": "true",
  "round": "true"
},
{
  "name": "yscale_spx",
  "type": "linear",
  "domain": {"data": "base_data", "field": "SPRealIndex"},
  "range": "height",
  "zero": "true",
  "round": "true",
  "nice": "true"
}
],
"axes": [
{
  "type": "x",
  "title": "date",
  "scale": "xscale"
},
{
  "type": "y",
  "title": "S&P 500",
  "scale": "yscale_spx"
}
] ,
"legends": [
{
  "fill": "colorscale",
  "title": "Period",
  "orient": "top-left",
  "properties": {
    "symbols": {
      "update": {
        "strokeWidth": {"value": 0},
        "shape": {"value": "square"},
        "opacity": {"value": 0.2},
        "fillOpacity": {"value": 0.2}
      }
    }
  }
}
]
}
