use std::mem;
use std::os::raw::c_void;

use protobuf::parse_from_bytes;

mod proto;
use proto::Action::Action;
use proto::Action::ActionType;

#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut c_void {
  let mut buffer = Vec::with_capacity(size);
  let pointer = buffer.as_mut_ptr();
  mem::forget(buffer);
  pointer
}

#[no_mangle]
pub extern "C" fn dealloc(pointer: *mut c_void, offset: usize) {
  unsafe { let _ = Vec::from_raw_parts(pointer, 0, offset); }
}

#[no_mangle]
pub extern fn read_action(pointer: *const u8, offset: usize) -> i32 {
  let slice: &[u8] = unsafe { std::slice::from_raw_parts(pointer, offset) };
  let action: Action = parse_from_bytes(slice).unwrap();
  match action.get_field_type() {
    ActionType::CREATE => 10,
    ActionType::READ => 11,
    ActionType::UPDATE => 12,
    ActionType::DELETE => 13,
  }
}
