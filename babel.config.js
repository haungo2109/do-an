module.exports = function(api) {
  api.cache(true);
  return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./app'],
					alias: {
						components: './app/components',
						screens: './app/screens',
						config: './app/config',
						navigations: './app/navigations',
						utils: './app/utils',
						actions: './app/redux/actions',
						constants: './app/constants',
						reducers: './app/redux/reducers',
						assets: './app/assets/',
						hooks: './app/hooks',
						api: './app/api',
					},
				},
			],
		],
  };
};
