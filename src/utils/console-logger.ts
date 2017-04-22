/**
 * Created by danv on 2/1/17.
 */
var logger: ConsoleLogger = null;

export class ConsoleLogger{
  private location: string = "[LOCAL]";

  constructor(location: string){
    this.location = location;
  }

  log(message: string){
    console.log(this.location + ": " +  message);
  }
}

export function getLogger(tag: string) {
  if (!logger)
    logger = new ConsoleLogger(tag);

  return logger
}
