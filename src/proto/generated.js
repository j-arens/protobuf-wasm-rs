/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Action = $root.Action = (() => {

    /**
     * Namespace Action.
     * @exports Action
     * @namespace
     */
    const Action = {};

    /**
     * ActionType enum.
     * @name Action.ActionType
     * @enum {string}
     * @property {number} CREATE=0 CREATE value
     * @property {number} READ=1 READ value
     * @property {number} UPDATE=2 UPDATE value
     * @property {number} DELETE=3 DELETE value
     */
    Action.ActionType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CREATE"] = 0;
        values[valuesById[1] = "READ"] = 1;
        values[valuesById[2] = "UPDATE"] = 2;
        values[valuesById[3] = "DELETE"] = 3;
        return values;
    })();

    Action.Action = (function() {

        /**
         * Properties of an Action.
         * @memberof Action
         * @interface IAction
         * @property {Action.ActionType|null} [type] Action type
         */

        /**
         * Constructs a new Action.
         * @memberof Action
         * @classdesc Represents an Action.
         * @implements IAction
         * @constructor
         * @param {Action.IAction=} [properties] Properties to set
         */
        function Action(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Action type.
         * @member {Action.ActionType} type
         * @memberof Action.Action
         * @instance
         */
        Action.prototype.type = 0;

        /**
         * Creates a new Action instance using the specified properties.
         * @function create
         * @memberof Action.Action
         * @static
         * @param {Action.IAction=} [properties] Properties to set
         * @returns {Action.Action} Action instance
         */
        Action.create = function create(properties) {
            return new Action(properties);
        };

        /**
         * Encodes the specified Action message. Does not implicitly {@link Action.Action.verify|verify} messages.
         * @function encode
         * @memberof Action.Action
         * @static
         * @param {Action.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified Action message, length delimited. Does not implicitly {@link Action.Action.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Action.Action
         * @static
         * @param {Action.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Action message from the specified reader or buffer.
         * @function decode
         * @memberof Action.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Action.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Action.Action();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Action message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Action.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Action.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Action message.
         * @function verify
         * @memberof Action.Action
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Action.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates an Action message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Action.Action
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Action.Action} Action
         */
        Action.fromObject = function fromObject(object) {
            if (object instanceof $root.Action.Action)
                return object;
            let message = new $root.Action.Action();
            switch (object.type) {
            case "CREATE":
            case 0:
                message.type = 0;
                break;
            case "READ":
            case 1:
                message.type = 1;
                break;
            case "UPDATE":
            case 2:
                message.type = 2;
                break;
            case "DELETE":
            case 3:
                message.type = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an Action message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Action.Action
         * @static
         * @param {Action.Action} message Action
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Action.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = options.enums === String ? "CREATE" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Action.ActionType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this Action to JSON.
         * @function toJSON
         * @memberof Action.Action
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Action.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Action;
    })();

    return Action;
})();

export { $root as default };
