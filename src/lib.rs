use std::mem;
use std::alloc;
use std::slice;
use std::panic;

use protobuf::{parse_from_bytes, Message};

mod proto;
use proto::Action::{Action, ActionType};
use proto::State::State;

extern {
  fn push_byte(byte: u8);
}

fn proto_from_bytes<T>(ptr: *mut u8, size: usize) -> T
  where T: Message
{
  let slice: &[u8] = unsafe { slice::from_raw_parts(ptr, size) };
  parse_from_bytes::<T>(slice).unwrap()
}

fn set_mode(a_type: ActionType, state: &mut State) {
  match a_type {
    ActionType::CREATE => state.set_mode(0),
    ActionType::READ => state.set_mode(1),
    ActionType::UPDATE => state.set_mode(2),
    ActionType::DELETE => state.set_mode(3),
  }
}

#[no_mangle]
pub extern fn compute_state(a_ptr: *mut u8, a_size: usize, s_ptr: *mut u8, s_size: usize) {
  let action = proto_from_bytes::<Action>(a_ptr, a_size);
  let mut state = proto_from_bytes::<State>(s_ptr, s_size);
  set_mode(action.get_payload(), &mut state);
  let bytes = state.write_to_bytes().unwrap();
  for byte in bytes.iter() {
    unsafe { push_byte(*byte) };
  }
}

// borrowed from wasm-bindgen
#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut u8 {
  let align = mem::align_of::<usize>();
  unsafe {
    if let Ok(layout) = alloc::Layout::from_size_align(size, align) {
      if layout.size() > 0 {
        let ptr = alloc::alloc(layout);
        if !ptr.is_null() {
          return ptr
        }
      } else {
        return align as *mut u8
      }
    }
  }
  panic!("alloc failure");
}

// borrowed from wasm-bindgen
#[no_mangle]
pub extern "C" fn free(ptr: *mut u8, size: usize) {
  if size == 0 {
    return
  }
  let align = mem::align_of::<usize>();
  unsafe {
    let layout = alloc::Layout::from_size_align_unchecked(size, align);
    alloc::dealloc(ptr, layout);
  }
}
