extern crate protobuf_codegen_pure;

fn main() {
  protobuf_codegen_pure::run(protobuf_codegen_pure::Args {
    out_dir: "src/",
    input: &["src/proto/Action.proto"],
    includes: &["src/proto"],
    customize: protobuf_codegen_pure::Customize {
      ..Default::default()
    },
  }).expect("protoc");
}
