# docker run --rm -it -v $(pwd):/data spugachev/wasm
FROM ubuntu:17.04	

LABEL maintainer="spugachev@gmail.com"
USER root

ENV APP_DIR /data
RUN mkdir $APP_DIR 

# *********************************************
# Core
# *********************************************
RUN apt-get update && apt-get install -y --no-install-recommends \
		ca-certificates \
        software-properties-common \
        apt-utils \
        locales \
        curl \
        wget \
        rsync \
        htop \
	&& rm -rf /var/lib/apt/lists/*

RUN set -ex; \
	if ! command -v gpg > /dev/null; then \
		apt-get update; \
		apt-get install -y --no-install-recommends \
			gnupg2 \
			dirmngr \
		; \
		rm -rf /var/lib/apt/lists/*; \
	fi

# Set the locale
RUN locale-gen en en_US en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN apt-get update && \
  apt-get install -y python python-dev python-pip python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y --no-install-recommends \
        less \
        tree \
        jq \
        nano \
        tmux \
	&& rm -rf /var/lib/apt/lists/*   
    
RUN apt-get update && apt-get install -y --no-install-recommends \
		git \
		openssh-client \
	&& rm -rf /var/lib/apt/lists/*   

RUN apt-get update && apt-get install -y --no-install-recommends \
		default-jdk \
	&& rm -rf /var/lib/apt/lists/*  
            
RUN set -ex; \
	apt-get update; \
	apt-get install -y --no-install-recommends \
		autoconf \
		automake \
		bzip2 \
		dpkg-dev \
		file \
		g++ \
		gcc \
		imagemagick \
		libbz2-dev \
		libc6-dev \
		libcurl4-openssl-dev \
		libdb-dev \
		libevent-dev \
		libffi-dev \
		libgdbm-dev \
		libgeoip-dev \
		libglib2.0-dev \
		libjpeg-dev \
		libkrb5-dev \
		liblzma-dev \
		libmagickcore-dev \
		libmagickwand-dev \
		libncurses-dev \
		libpng-dev \
		libpq-dev \
		libreadline-dev \
		libsqlite3-dev \
		libssl-dev \
		libtool \
		libwebp-dev \
		libxml2-dev \
		libxslt-dev \
		libyaml-dev \
		make \
        cmake \
		patch \
		xz-utils \
		zlib1g-dev \
		$(if apt-cache show 'default-libmysqlclient-dev' 2>/dev/null | grep -q '^Version:'; then \
				echo 'default-libmysqlclient-dev'; \
		else \
				echo 'libmysqlclient-dev'; \
		fi ); \
	rm -rf /var/lib/apt/lists/*
# https://lists.debian.org/debian-devel-announce/2016/09/msg00000.html
# if we use just "apt-cache show" here, it returns zero because "Can't select versions from package 'libmysqlclient-dev' as it is purely virtual", hence the pipe to grep
# *********************************************
# ZSH
# *********************************************
RUN apt-get update && apt-get install -y --no-install-recommends \
		zsh \
	&& rm -rf /var/lib/apt/lists/*   

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
#RUN sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="agnoster"/g' ~/.zshrc
RUN sed -i -E "s/^plugins=\((.*)\)$/plugins=(\1 tmux)/" ~/.zshrc
RUN ln -f /bin/zsh /bin/sh
ENV SHELL /bin/zsh
# *********************************************
# Node
# *********************************************
RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# gpg keys listed at https://github.com/nodejs/node#release-team
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    56730D5401028683275BD23C23EFEFE93C4CFFFE \
  ; do \
    gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.5.0

RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
  && curl -SLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

ENV YARN_VERSION 1.0.2

RUN set -ex \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
  done \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && mkdir -p /opt/yarn \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/yarn --strip-components=1 \
  && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz
# *********************************************
# Node Packages
# *********************************************
RUN yarn global add \
    bower webpack gulp grunt grunt-cli browserify \
    pm2 nodemon forever serve \
    typescript ts-node \
    babel-cli babel-preset-env babel-preset-react babel-polyfill \
    jshint eslint postcss-cli \
    yo @angular/cli create-react-app vue-cli \
    && yarn cache clean
# *********************************************
# Emscripten
# *********************************************
RUN curl -s https://s3.amazonaws.com/mozilla-games/emscripten/packages/emscripten/nightly/linux/emscripten-latest.tar.gz -o emscripten-latest.tar.gz && \
    curl -s https://s3.amazonaws.com/mozilla-games/emscripten/packages/llvm/nightly/linux_64bit/emscripten-llvm-latest.tar.gz -o emscripten-llvm-latest.tar.gz

RUN mkdir emscripten && mkdir llvm && \
    tar -xzf emscripten-latest.tar.gz -C emscripten --strip-components=1 && \
    tar -xzf emscripten-llvm-latest.tar.gz -C llvm --strip-components=1 && \
    ln -s /emscripten/emcc /usr/local/bin && \
    emcc && \
    sed -i.bak "s/LLVM_ROOT =.*/LLVM_ROOT = '\/llvm\/'/" /root/.emscripten && \
    touch /root/.emscripten && \
    echo 'int main() {}' > tmp.c && \
    emcc tmp.c && emcc -s WASM=1 tmp.c && rm tmp.c

WORKDIR $APP_DIR
CMD ["/bin/zsh"]