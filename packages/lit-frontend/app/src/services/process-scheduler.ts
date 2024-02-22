export class ProcessScheduler {
  private static instance: ProcessScheduler = new ProcessScheduler();

  private scheduleList: VoidFunction[] = [];

  static schedule(process: VoidFunction) {
    this.instance.scheduleList.push(process);
  }

  private constructor() {
    setInterval(() => {
      this.executeAll();
    }, 1000);
  }

  private executeAll() {
    while (this.scheduleList.length > 0) {
      const process = this.scheduleList.shift();
      if (process) {
        process();
      }
    }
  }
}
