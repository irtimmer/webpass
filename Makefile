EXT_FILES = extension/*.js extension/*.json extension/*.html extension/*.css extension/*.png
CHROME := $(shell (which chrome || which google-chrome || which chromium) 2> /dev/null)

webpass.crx: $(EXT_FILES)
	$(CHROME) --pack-extension=./extension --pack-extension-key=webpass.pem
	mv extension.crx webpass.crx

all: webpass.crx
