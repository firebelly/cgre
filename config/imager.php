<?php
return [
  '*' => [
    'jpegoptimEnabled' => true,
    'optipngEnabled' => true,
    'imagerUrl' => '@rootUrl/imager/',
  ],
  'staging' => [
    'useCwebp' => true,
    'cwebpPath' => '/home/cgre2020/bin/cwebp',
  ],
  'production' => [
    'useCwebp' => true,
    'cwebpPath' => '/home/cgre2020/bin/cwebp',
  ],
];
