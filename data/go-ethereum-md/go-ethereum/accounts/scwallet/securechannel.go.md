## SecureChannelSession

`SecureChannelSession` is a struct that enables secure communication with a hardware wallet. It contains information about the smartcard, shared secrets, public keys, session encryption and MAC keys, and the current IV.

### Variables

- `maxPayloadSize`: the maximum size of a payload that can be sent to the smartcard.
- `pairP1FirstStep`: the first step in the pairing process.
- `pairP1LastStep`: the last step in the pairing process.
- `scSecretLength`: the length of the shared secret used for secure communication.
- `scBlockSize`: the block size used for encryption and decryption.
- `insOpenSecureChannel`: the instruction code for opening a secure channel.
- `insMutuallyAuthenticate`: the instruction code for mutual authentication.
- `insPair`: the instruction code for pairing.
- `insUnpair`: the instruction code for unpairing.
- `pairingSalt`: the salt used for generating the pairing key.

### Functions

#### NewSecureChannelSession

`NewSecureChannelSession` creates a new secure channel for the given card and public key. It takes in a `*pcsc.Card` and a byte slice as parameters and returns a pointer to a new `SecureChannelSession` and an error.

#### Pair

`Pair` establishes a new pairing with the smartcard. It takes in a byte slice as a parameter and returns an error.

#### pair

`pair` sends a pairing command to the smartcard. It takes in a byte and a byte slice as parameters and returns a `*pcsc.Response` and an error.

#### OpenSecureChannel

`OpenSecureChannel` opens a secure channel with the smartcard. It takes in a `byte` as a parameter and returns an error.

#### MutuallyAuthenticate

`MutuallyAuthenticate` performs mutual authentication with the smartcard. It takes in a `byte` as a parameter and returns an error.

#### Encrypt

`Encrypt` encrypts a payload using the current session encryption key and IV. It takes in a byte slice as a parameter and returns a byte slice and an error.

#### Decrypt

`Decrypt` decrypts a payload using the current session encryption key and IV. It takes in a byte slice as a parameter and returns a byte slice and an error.

#### MAC

`MAC` calculates a message authentication code (MAC) for a payload using the current session MAC key and IV. It takes in a byte slice as a parameter and returns a byte slice and an error.

#### GenerateIV

`GenerateIV` generates a new initialization vector (IV) for encryption and decryption. It takes no parameters and returns a byte slice.

#### GenerateSessionKeys

`GenerateSessionKeys` generates new session encryption and MAC keys. It takes no parameters and returns a byte slice for the encryption key and a byte slice for the MAC key.

#### aesEncrypt

`aesEncrypt` encrypts a payload using AES encryption. It takes in a byte slice, a byte slice, and a byte slice as parameters and returns a byte slice and an error.

#### aesDecrypt

`aesDecrypt` decrypts a payload using AES decryption. It takes in a byte slice, a byte slice, and a byte slice as parameters and returns a byte slice and an error.

#### sha512Hash

`sha512Hash` calculates a SHA-512 hash of a byte slice. It takes in a byte slice as a parameter and returns a byte slice.

#### pbkdf2Hash

`pbkdf2Hash` calculates a PBKDF2 hash of a byte slice. It takes in a byte slice, a byte slice, an integer, an integer, and a hash function as parameters and returns a byte slice.

#### generateECDHSecret

`generateECDHSecret` generates an Elliptic Curve Diffie-Hellman (ECDH) shared secret. It takes in an `*elliptic.CurveParams`, a byte slice, and a byte slice as parameters and returns a byte slice.

#### generateEphemeralKey

`generateEphemeralKey` generates an ephemeral ECDSA keypair. It takes no parameters and returns an `*ecdsa.PrivateKey` and an error.

#### generateChallenge

`generateChallenge` generates a random challenge for the pairing process. It takes no parameters and returns a byte slice.

#### normalizeBytes

`normalizeBytes` normalizes a byte slice using Unicode normalization. It takes in a byte slice as a parameter and returns a byte slice.

#### unmarshalPublicKey

`unmarshalPublicKey` unmarshals a public key from a byte slice. It takes in a byte slice as a parameter and returns an `*ecdsa.PublicKey` and an error.

#### marshalPublicKey

`marshalPublicKey` marshals a public key to a byte slice. It takes in an `*ecdsa.PublicKey` as a parameter and returns a byte slice.

#### generateCryptogram

`generateCryptogram` generates a cryptogram for ## SecureChannelSession

`SecureChannelSession` is a struct that represents a secure channel session with a smart card. It provides methods for pairing, unpairing, opening, and transmitting encrypted messages.

### Variables

- `claSCWallet`: a byte variable that represents the class byte for the secure channel wallet.
- `insOpenSecureChannel`: a byte variable that represents the instruction byte for opening a secure channel.
- `insPair`: a byte variable that represents the instruction byte for pairing.
- `insMutuallyAuthenticate`: a byte variable that represents the instruction byte for mutual authentication.
- `scSecretLength`: an integer variable that represents the length of the secret used in the secure channel.
- `scBlockSize`: an integer variable that represents the block size used in the secure channel.

### Functions

#### Pair

`Pair` establishes a new pairing with the smart card. It takes in a `context.Context` and a `uint8` as parameters and returns an error.

#### Unpair

`Unpair` disestablishes an existing pairing. It takes in a `context.Context` as a parameter and returns an error.

#### Open

`Open` initializes the secure channel. It takes in a `context.Context` as a parameter and returns an error.

#### mutuallyAuthenticate

`mutuallyAuthenticate` is an internal method to authenticate both ends of the connection. It takes no parameters and returns an error.

#### open

`open` is an internal method that sends an open APDU. It takes no parameters and returns a `*responseAPDU` and an error.

#### pair

`pair` is an internal method that sends a pair APDU. It takes in a `uint8` and a byte slice as parameters and returns a `*responseAPDU` and an error.

#### transmitEncrypted

`transmitEncrypted` sends an encrypted message, and decrypts and returns the response. It takes in a `byte`, a `byte`, a `byte`, a `byte`, and a byte slice as parameters and returns a `*responseAPDU` and an error.

#### decryptAPDU

`decryptAPDU` decrypts an APDU using AES-CBC encryption. It takes in a byte slice as a parameter and returns a byte slice and an error.

#### encryptAPDU

`encryptAPDU` encrypts an APDU using AES-CBC encryption. It takes in a byte slice as a parameter and returns a byte slice and an error.

#### updateIV

`updateIV` updates the initialization vector (IV) used in the secure channel. It takes in a byte slice and a byte slice as parameters and returns an error.

#### transmit

`transmit` sends a command APDU to the smart card and returns the response APDU. It takes in a `*smartcard.Card` and a `*commandAPDU` as parameters and returns a `*responseAPDU` and an error.

#### deserialize

`deserialize` deserializes a byte slice into a response APDU. It takes in a byte slice as a parameter and returns an error. The `encryptAPDU` function is an internal method that serializes and encrypts an APDU. It takes in a byte slice `data` as a parameter and returns a byte slice and an error. The function first checks if the length of the data exceeds the maximum payload size and returns an error if it does. It then pads the data to a 16-byte boundary using the `pad` function. The function then creates a new AES cipher using the session encryption key and initializes a new CBC encrypter with the cipher and the session initialization vector. The encrypter then encrypts the padded data and returns the resulting byte slice.

The `pad` function applies message padding to a 16-byte boundary. It takes in a byte slice `data` and a byte `terminator` as parameters and returns a byte slice. The function creates a new byte slice with a length that is a multiple of 16 and copies the data into it. It then adds the terminator byte to the end of the data and returns the padded byte slice.

The `decryptAPDU` function is an internal method that decrypts and deserializes an APDU. It takes in a byte slice `data` as a parameter and returns a byte slice and an error. The function creates a new AES cipher using the session encryption key and initializes a new CBC decrypter with the cipher and the session initialization vector. The decrypter then decrypts the data and returns the resulting byte slice after removing the padding using the `unpad` function.

The `unpad` function strips padding from a message. It takes in a byte slice `data` and a byte `terminator` as parameters and returns a byte slice and an error. The function iterates over the last 16 bytes of the data and checks if each byte is a terminator byte or a zero byte. If it encounters a terminator byte, it returns the data up to that point. If it encounters a non-zero byte that is not a terminator byte, it returns an error. If it reaches the end of the loop without finding a terminator byte, it returns an error.

The `updateIV` function is an internal method that updates the initialization vector after each message exchanged. It takes in byte slices `meta` and `data` as parameters and returns an error. The function pads the data to a 16-byte boundary using the `pad` function. It then creates a new AES cipher using the session MAC key and initializes a new CBC encrypter with the cipher and a zero initialization vector. The encrypter then encrypts the meta and data byte slices and updates the session initialization vector with the last 16 bytes of the encrypted data.