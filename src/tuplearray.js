// Tuple array class
export default class TupleArray extends Array
{
  // Constructor
  constructor(...elements)
  {
    super(...elements);
  }

  // Get a tuple value by key
  valueFor(key)
  {
    for (let tuple of this)
      if (tuple[0] === key)
        return tuple[1];
    return null;
  }

  // Get a tuple key by value
  keyFor(value)
  {
    for (let tuple of this)
      if (tuple[1] === value)
        return tuple[0];
    return null;
  }

  // Create a tuple array from an array
  static fromArray(array)
  {
    return new TupleArray(...array);
  }
}
