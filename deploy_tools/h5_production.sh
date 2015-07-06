#!/bin/bash

local_dir="../h5"
config="production"
make_dir="h5-"$config
wechat="wechat"
xiaomi="xiaomi"
alipay="alipay"
normal="normal"
rc="rc"
mirc="mirc"

PATH=$PATH:./libs/

bash _make_h5.sh $local_dir $config $make_dir $wechat $alipay $xiaomi $normal $rc $mirc &&

bash _ui.sh 120.132.59.94 $PRODUCTION_PWD "/data/apps" $local_dir/$make_dir &&

bash _git.sh "h5_production"