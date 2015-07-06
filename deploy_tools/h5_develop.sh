#!/bin/bash

local_dir="../h5"
config="develop"
make_dir="h5-"$config
wechat="wechat"
xiaomi="xiaomi"
alipay="alipay"
normal="normal"
rc="rc"
mirc="mirc"

PATH=$PATH:./libs/

bash _make_h5.sh $local_dir $config $make_dir $wechat $alipay $xiaomi $normal $rc $mirc &&

bash _ui.sh 123.59.52.186 yangaiche@test766 "/data/apps" $local_dir/$make_dir &&

bash _git.sh "h5_develop"