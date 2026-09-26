<?php
$map = [
    'lingÃ¼Ã­sticas' => 'lingüísticas',
    'vitivinÃ­cola' => 'vitivinícola',
    'enolÃ³gico' => 'enológico',
    'enolÃ³gicas' => 'enológicas',
    "Tierra D'AcogidaÂ®" => "Tierra D'Acogida®",
    "Tierra D'AcogidarÂ®" => "Tierra D'Acogida®",
    'â€"' => '—',
    'â€“' => '–',
    'Â¿' => '¿',
    'Â®' => '®',
    'Ã¡' => 'á',
    'Ã©' => 'é',
    'Ã­' => 'í',
    'Ã³' => 'ó',
    'Ãº' => 'ú',
    'Ã±' => 'ñ',
    'Ã¼' => 'ü',
    'Ãš' => 'Ú',
    'Ã‰' => 'É',
    'Ã"' => 'Ó',
];

$dir = dirname(__DIR__) . '/template-parts/pages';
foreach (glob($dir . '/*.php') as $file) {
    $content = file_get_contents($file);
    $fixed = str_replace(array_keys($map), array_values($map), $content);
    if ($fixed !== $content) {
        file_put_contents($file, $fixed);
        echo 'fixed ' . basename($file) . PHP_EOL;
    }
}
