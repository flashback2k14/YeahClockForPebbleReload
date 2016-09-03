module.exports = [
	{
    "type": "heading",
    "defaultValue": "Yeah! Clock Reload",
		"size": 1
  },
  {
    "type": "heading",
    "defaultValue": "Watchface Configuration",
		"size": 3
  },
	{
		"type": "section",
		"items": [
			{
				"type": "heading",
				"defaultValue": "Colors Options",
				"size": 4
			},
			{
				"type": "color",
				"appKey": "backgroundColor", // messageKey for newer clay versions
				"defaultValue": "0x000000",
				"sunlight": true,
				"allowGray": true,
				"label": "Background Color"
			},
			{
				"type": "color",
				"appKey": "foregroundColor", // messageKey for newer clay versions
				"defaultValue": "0xFFFFFF",
				"sunlight": true,
				"allowGray": true,
				"label": "Foreground Color"
			}
		]
	},
	{
		"type": "section",
		"items": [
			{
				"type": "heading",
				"defaultValue": "Time Options",
				"size": 4
			},
			{
				"type": "select",
				"appKey": "switchingTime", // messageKey for newer clay versions
				"defaultValue": "10",
				"label": "Time between switch Date and Weather (min)",
				"options": [
					{ 
						"label": "2",
						"value": 2 
					},
					{ 
						"label": "5",
						"value": 5 
					},
					{ 
						"label": "10",
						"value": 10 
					},
					{ 
						"label": "15",
						"value": 15 
					},
					{ 
						"label": "20",
						"value": 20 
					},
					{ 
						"label": "30",
						"value": 30 
					}
				]
			},
			{
				"type": "select",
				"appKey": "fetchingTime", // messageKey for newer clay versions
				"defaultValue": "4",
				"label": "Time between fetching Weather Data (h)",
				"options": [
					{ 
						"label": "1",
						"value": 1 
					},
					{ 
						"label": "2",
						"value": 2 
					},
					{ 
						"label": "4",
						"value": 4 
					},
					{ 
						"label": "8",
						"value": 8 
					},
					{ 
						"label": "12",
						"value": 12 
					}
				]
			}
		]
	},
	{
		"type": "section",
		"items": [
			{
				"type": "heading",
				"defaultValue": "More Options",
				"size": 4
			},
			{
				"type": "toggle",
				"appKey": "hideMiddleRow", // messageKey for newer clay versions
				"label": "Hide Date and Weather",
				"defaultValue": false
			},
			{
				"type": "select",
				"appKey": "temperatureType", // messageKey for newer clay versions
				"defaultValue": "celsius",
				"label": "Temperature Type",
				"options": [
					{ 
						"label": "Celsius",
						"value": "celsius" 
					},
					{ 
						"label": "Fahrenheit",
						"value": "fahrenheit" 
					}
				]
			}
		]
	},
	{
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];