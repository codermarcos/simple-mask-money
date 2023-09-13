export const createTrigger = (input: HTMLInputElement) => (key: string) => {
  input
    .dispatchEvent(
      new KeyboardEvent('keydown', { key })
    );
};

export const createWriter = (input: HTMLInputElement) => {
  const trigger = createTrigger(input);  
  return (v: string) => {
    v
      .split('')
      .forEach(
        key => trigger(key)
      );
  };
};
