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
   * The name of the network interface
   * Used as the primary identifier for configuration in all modules.
   * @example 'eth0'
   */
  interface: string;

  /**
   * VLAN ID for creating a VLAN interface on top of the base interface.
   * If set, a VLAN interface is created
   * @default undefined
   * @example 10
   */
  vlanid?: number;

  /**
   * Custom interface name.
   * Auto-generated if not provided for VLANs.
   * @default $interface.$vlanid (e.g., 'eth0.10')
   * @example 'eth0.10'
   */
  ifname?: string;

  /**
   * The static IP address to assign to the interface.
   * Used for static configuration. If omitted and dhcp is not set, interface may be manual.
   * @default undefined
   * @example '192.168.1.10'
   */
  ip_address?: string;

  /**
   * Network prefix length (CIDR, e.g., 24 for 255.255.255.0).
   * Used with ip_address to form the subnet.
   * @default undefined
   * @example 24
   */
  prefix?: number;

  /**
   * Default gateway IP address for the interface.
   * Used to set the default route for the interface.
   * @default undefined
   * @example '192.168.1.1'
   */
  gateway?: string;

  /**
   * DNS nameservers for the interface. Can be a string (space/comma separated) or array.
   * Used to populate DNS settings in config files.
   * @default undefined
   * @example ['8.8.8.8', '1.1.1.1 1.2.2.1']
   * @example '8.8.8.8, 1.1.1.1 1.2.2.1'
   */
  nameservers?: string[] | string;

  /**
   * If true, marks the interface as not required for boot.
   * Used by netplan and interfaces.d for boot optimization.
   * @default false
   */
  optional?: boolean;

  /**
   * If true, configures the interface to use DHCP for IP assignment.
   * Used for dynamic IP configuration in all modules.
   * @default false
   */
  dhcp?: boolean;

  /**
   * If true, disables ARP on the interface (used in dhcpcd).
   * @default false
   */
  noarp?: boolean;

  /**
   * If true, marks the interface as a PPP (Point-to-Point Protocol) interface (e.g., PPPoE).
   * Used for PPPoE configuration.
   * @default false
   */
  ppp?: boolean;

  /**
   * If true, configures the interface in manual mode (no IP assignment).
   * Used for bridge members or when no IP is needed.
   * @default false
   */
  manual?: boolean;

  /**
   * Custom static routes for the interface (netplan only).
   * Each route should specify a destination and a gateway.
   * @default []
   * @example [{ to: 'default', via: '192.168.1.1' }]
   */
  routes?: Array<{ to: string; via: string }>;

  /**
   * List of interfaces to be bridged together (for bridge interfaces).
   * Used to configure Linux bridges (e.g., br0 with eth0, eth1).
   * @default undefined
   * @example ['eth0', 'eth1']
   */
  bridge_ports?: string[];

  /**
   * Bridge-specific options (e.g., Spanning Tree Protocol).
   * Used to set bridge parameters like STP on/off.
   * @default undefined
   * @example { stp: true }
   */
  bridge_opts?: {
    /**
     * Enable or disable Spanning Tree Protocol (STP) on the bridge.
     * @default false
     */
    stp?: boolean;
  };

  /**
   * Provider type for special interfaces (e.g., PPPoE).
   * Used to select config template for PPP (e.g., 'dsl-provider').
   * @default undefined
   * @example 'dsl-provider'
   */
  provider?: string;

  /**
   * Underlying physical interface for virtual/logical interfaces (e.g., PPPoE).
   * Used for PPPoE configuration to specify the real device.
   * @default undefined
   * @example 'eth0'
   */
  physical_interface?: string;
}
