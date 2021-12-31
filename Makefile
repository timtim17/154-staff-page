build:
	mkdir -p build
	zip -r build/austin-jenchi.zip img *.*
	cp img/profile.jpg build/austin-jenchi.jpg

clean:
	rm -r build
