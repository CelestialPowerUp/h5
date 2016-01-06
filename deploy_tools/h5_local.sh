#!/bin/bash

local_dir=".."
config="local"
make_dir="h5-"${config}

PATH=$PATH:./libs/

bash _make_h5_2.sh ${local_dir} ${config} ${make_dir}
