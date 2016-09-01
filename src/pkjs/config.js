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
				"sunlight": false,
				"allowGray": true,
				"label": "Background Color"
			},
			{
				"type": "color",
				"appKey": "foregroundColor", // messageKey for newer clay versions
				"defaultValue": "0xFFFFFF",
				"sunlight": false,
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
				"defaultValue": "More Options",
				"size": 4
			},
			{
				"type": "toggle",
				"appKey": "hideMiddleRow", // messageKey for newer clay versions
				"label": "Show / Hide Date and Weather",
				"defaultValue": false
			}
		]
	},
	{
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];