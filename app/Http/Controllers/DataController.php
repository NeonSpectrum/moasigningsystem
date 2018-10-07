<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class DataController extends Controller {

  /**
   * @param Request $request
   */
  protected function show(Request $request) {
    $rows = \DB::table('data')->get();

    return view('dashboard', ['data' => $rows]);
  }

  /**
   * @param Request $request
   */
  protected function get(Request $request) {

    if ($request->id) {
      $rows = \DB::table('data')->where('id', $request->id)->first();
    } else {
      $rows = \DB::table('data')->get();
    }

    return json_encode($rows ?? []);
  }
  /**
   * @param Request $request
   */
  protected function add(Request $request) {
    parse_str($request->data, $data);
    $authors  = $request->authors;
    $keywords = $request->keywords;
    $file     = $request->file;

    $filename = str_replace('.' . $file->getClientOriginalExtension(), '', $file->getClientOriginalName()) . '-' . time() . '.' . $file->getClientOriginalExtension();
    $file->move(public_path('uploads'), $filename);

    try {
      $affectedRows = \DB::table('data')->insert([
        'title'     => $data['title'],
        'authors'   => $authors,
        'keywords'  => $keywords,
        'date'      => date('Y-m-d', strtotime($data['date'])),
        'file_name' => $filename
      ]);
    } catch (QueryException $e) {
      return json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    if ($affectedRows > 0) {
      return json_encode(['success' => true]);
    } else {
      return json_encode(['success' => false, 'error' => 'Nothing changed!']);
    }
  }
  /**
   * @param Request $request
   */
  protected function edit(Request $request) {
    parse_str($request->data, $data);
    $authors  = $request->authors;
    $keywords = $request->keywords;
    $file     = $request->file;

    $arr = [
      'title'    => $data['title'],
      'authors'  => $authors,
      'keywords' => $keywords,
      'date'     => date('Y-m-d', strtotime($data['date']))
    ];

    if ($request->file) {
      $filename = str_replace('.' . $file->getClientOriginalExtension(), '', $file->getClientOriginalName()) . '-' . time() . '.' . $file->getClientOriginalExtension();

      $file->move(public_path('uploads'), $filename);

      $arr['file_name'] = $filename;
    }

    try {
      $affectedRows = \DB::table('data')->where('id', $data['id'])->update($arr);
    } catch (QueryException $e) {
      return json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    if ($affectedRows > 0) {
      return json_encode(['success' => true]);
    } else {
      return json_encode(['success' => false, 'error' => 'Nothing changed!']);
    }
  }
  /**
   * @param Request $request
   */
  protected function delete(Request $request) {
    try {
      $affectedRows = \DB::table('data')->where('id', $request->id)->delete();
    } catch (QueryException $e) {
      return json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    if ($affectedRows > 0) {
      return json_encode(['success' => true]);
    } else {
      return json_encode(['success' => false, 'error' => 'Nothing changed!']);
    }
  }
}
