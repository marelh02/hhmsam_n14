export function getDAppMetadata(){
    return {
        name: getDAppName(),
        description: getDAppDescription(),
        url: getDAppUrl(),
        icons: getDAppIcons()
    }
}

export function getDAppProjectId(): string {
    return process.env.NEXT_PUBLIC_PROJECT_ID || '';
  }

export function getDAppName(): string {
    return process.env.DAPP_NAME || '';
  }
  
  export function getDAppDescription(): string {
    return process.env.DAPP_DESCRIPTION || '';
  }
  
  export function getDAppUrl(): string {
    return process.env.DAPP_URL || '';
  }
  
  export function getDAppIcons(): string[] {
    return ["https://cdn-icons-png.flaticon.com/512/5987/5987861.png"];
  }