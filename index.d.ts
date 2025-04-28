/**
 * Configures network interfaces based on the provided configurations.
 * @param configs - A single configuration object or an array of configurations.
 * @returns A promise that resolves when the configuration is complete.
 */
export function configure(
  configs: NetworkConfig | NetworkConfig[]
): Promise<void>;

/**
 * Restarts the networking service.
 * @returns A promise that resolves when the service is successfully restarted.
 */
export function restartService(): Promise<void>;

/**
 * Represents a network configuration.
 */
export interface NetworkConfig {
  /**
   * The name of the network interface (e.g., 'eth0', 'br0').
   * Used as the primary identifier for configuration in all modules.
   */
  interface: string;

  /**
   * VLAN ID for creating a VLAN interface on top of the base interface.
   * If set, a VLAN interface is created (e.g., eth0.10).
   */
  vlanid?: number;

  /**
   * List of interfaces to be bridged together (for bridge interfaces).
   * Used to configure Linux bridges (e.g., br0 with eth0, eth1).
   */
  bridge_ports?: string[];

  /**
   * Custom interface name (e.g., for VLANs: eth0.10). Auto-generated if not provided for VLANs.
   */
  ifname?: string;

  /**
   * The static IP address to assign to the interface (e.g., '192.168.1.10').
   * Used for static configuration. If omitted and dhcp is not set, interface may be manual.
   */
  ip_address?: string;

  /**
   * Network prefix length (CIDR, e.g., 24 for 255.255.255.0).
   * Used with ip_address to form the subnet.
   */
  prefix?: number;

  /**
   * Default gateway IP address for the interface.
   * Used to set the default route for the interface.
   */
  gateway?: string;

  /**
   * DNS nameservers for the interface. Can be a string (space/comma separated) or array.
   * Used to populate DNS settings in config files.
   */
  nameservers?: string[] | string;

  /**
   * If true, marks the interface as not required for boot.
   * Used by netplan and interfaces.d for boot optimization.
   */
  optional?: boolean;

  /**
   * If true, configures the interface in manual mode (no IP assignment).
   * Used for bridge members or when no IP is needed.
   */
  manual?: boolean;

  /**
   * Bridge-specific options (e.g., Spanning Tree Protocol).
   * Used to set bridge parameters like STP on/off.
   */
  bridge_opts?: {
    /**
     * Enable or disable Spanning Tree Protocol (STP) on the bridge.
     */
    stp?: boolean;
  };

  /**
   * Provider type for special interfaces (e.g., PPPoE).
   * Used to select config template for PPP (e.g., 'dsl-provider').
   */
  provider?: string;

  /**
   * Underlying physical interface for virtual/logical interfaces (e.g., PPPoE).
   * Used for PPPoE configuration to specify the real device.
   */
  physical_interface?: string;
}
