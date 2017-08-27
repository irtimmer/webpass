EXT_FILES = extension/*.js extension/*.json extension/*.html extension/*.css extension/*.png
CHROME := $(shell (which chrome || which google-chrome || which chromium) 2> /dev/null)

all: webpass.crx webpass.xpi

webpass.crx: $(EXT_FILES)
	$(CHROME) --pack-extension=./extension --pack-extension-key=webpass.pem
	mv extension.crx webpass.crx

webpass.xpi: $(EXT_FILES)
	rm -f webpass.xpi
	zip -r webpass.xpi $(EXT_FILES)
