build: build.js
	stylus --include client/stylesheets --include node_modules/nib/lib --compress --out client/stylesheets client/stylesheets/style.styl

compile: 
	stylus --include client/stylesheets --include node_modules/nib/lib --out client/stylesheets client/stylesheets/style.styl
	
watch: 
	stylus --include client/stylesheets --include node_modules/nib/lib --out client/stylesheets --watch client/stylesheets/style.styl

.PHONY: build watch compile