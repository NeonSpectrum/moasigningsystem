<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class DataImport implements ToCollection {
  /**
   * @param Collection $collection
   */
  public function collection(Collection $collection) {
    $collection = $collection->slice(1);

    $affectedRows = 0;

    foreach ($collection as $row) {
      try {
        if ($row[0] == '') {
          break;
        }

        $affectedRows += \DB::table('data')->insert([
          'partner_institution' => $row[0],
          'activity_name'       => $row[1],
          'date'                => is_numeric($row[2]) ? gmdate('F d, Y', ($row[2] - 25569) * 86400) : $row[2]
        ]);
      } catch (QueryException $e) {
        return json_encode(['success' => false, 'error' => $e->getMessage()]);
      }
    }

    return json_encode(['success' => true, 'affectedRows' => $affectedRows]);
  }
}
