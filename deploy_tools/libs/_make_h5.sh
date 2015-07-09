#!/bin/bash

echo making fis configs
bash _make_fis_configs.sh $1
echo "done"

echo $1-\>$2-\>$3

function before_xiaomi {
    if [ -e $1/tmp ]; then
        rm -rf $1/tmp/ &&
        mkdir $1/tmp
    else
        mkdir $1/tmp
    fi

    echo 'before fis xiaomi' &&
    cp -a $1/webapp/* $1/tmp/ &&
    cp -a $1/xiaomi_ui/* $1/webapp/ &&
    echo 'done'
}

function after_xiaomi {
    echo 'after fis xiaomi' &&
    cp -a $1/tmp/* $1/webapp/ &&
    echo 'done'
}

deploy=$(10)

if [ ${deploy:0:1} == 'y' ]; then
    mkdir -p $1/$3/$4 &&
    fis release -com -r $1/webapp/ -f $1/"fis-cfgs"/"fis-"$2"-"$4"-conf.js" -d $1/$3/$4 -D &&
    cp -a $1/webapp/js/openid/* $1/$3/$4/js/openid &&
    bash _cp_json.sh $1/enviroment/$2 $1/platform/$4 $1/$3/$4
fi

if [ ${deploy:1:1} == 'y' ]; then
    mkdir -p $1/$3/$5 &&
    fis release -com -r $1/webapp/ -f $1/"fis-cfgs"/"fis-"$2"-"$5"-conf.js" -d $1/$3/$5 -D &&
    cp -a $1/webapp/js/openid/* $1/$3/$5/js/openid &&
    bash _cp_json.sh $1/enviroment/$2 $1/platform/$5 $1/$3/$5
fi

if [ ${deploy:2:1} == 'y' ]; then
    mkdir -p $1/$3/$6 &&
    before_xiaomi $1 &&
    fis release -com -r $1/webapp/ -f $1/"fis-cfgs"/"fis-"$2"-"$6"-conf.js" -d $1/$3/$6 -D &&
    after_xiaomi $1 &&
    cp -a $1/webapp/js/openid/* $1/$3/$6/js/openid &&
    bash _cp_json.sh $1/enviroment/$2 $1/platform/$6 $1/$3/$6
fi

if [ ${deploy:3:1} == 'y' ]; then
    mkdir -p $1/$3/$7 &&
    fis release -com -r $1/webapp/ -f $1/"fis-cfgs"/"fis-"$2"-"$7"-conf.js" -d $1/$3/$7 -D &&
    cp -a $1/webapp/js/openid/* $1/$3/$7/js/openid &&
    bash _cp_json.sh $1/enviroment/$2 $1/platform/$7 $1/$3/$7
fi

if [ ${deploy:4:1} == 'y' ]; then
    mkdir -p $1/$3/$8 &&
    fis release -com -r $1/webapp/ -f $1/"fis-cfgs"/"fis-"$2"-"$8"-conf.js" -d $1/$3/$8 -D &&
    cp -a $1/webapp/js/openid/* $1/$3/$8/js/openid &&
    bash _cp_json.sh $1/enviroment/$2 $1/platform/$8 $1/$3/$8
fi

if [ ${deploy:5:1} == 'y' ]; then
    mkdir -p $1/$3/$9 &&
    before_xiaomi $1 &&
    fis release -com -r $1/webapp/ -f $1/"fis-cfgs"/"fis-"$2"-"$9"-conf.js" -d $1/$3/$9 -D &&
    after_xiaomi $1 &&
    cp -a $1/webapp/js/openid/* $1/$3/$9/js/openid &&
    bash _cp_json.sh $1/enviroment/$2 $1/platform/$9 $1/$3/$9
fi

echo "done..."